import express from "express";
import Tutorial from "../models/tutorial.js";
import Teacher from "../models/teacher.js";
import User from "../models/user.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
//add email stuff later

const router = express.Router();

router.post("/create-tutorial", async (req, res) => {
  try {
    const {
      teacherId,
      csClass,
      type,
      alert,
      teacherEmail,
      date,
      finishDate,
      time,
    } = req.body;

    const teacherUser = await Teacher.findOne({ userId: teacherId.userId });
    const teacherName = teacherUser.name;
    const classroom = teacherUser.classRoom;

    if (!teacherUser) {
      console.log("Teacher not found");
      return res.status(402).json({ message: "Teacher not found" });
    }

    const day = new Date(date);
    const finishDay = new Date(finishDate);

    const tutorialsToInsert = [];

    while (day <= finishDay) {
      if (day.getDay() >= 1 && day.getDay() <= 5) {
        const newTutorial = new Tutorial({
          teacher: teacherUser,
          teacherName,
          csClass,
          classroom,
          type,
          alert,
          teacherEmail,
          date: new Date(day),
          finishDate: new Date(finishDay),
          time,
          students: [],
          studentNames: [],
          numberSignedUp: 0,
        });

        tutorialsToInsert.push(newTutorial);
      }

      day.setDate(day.getDate() + 7);
    }

    tutorialsToInsert.sort((a, b) => a.date - b.date);

    for (const tutorial of tutorialsToInsert) {
      const savedTutorial = await tutorial.save();
      teacherUser.createdTutorials.push(savedTutorial);
      await teacherUser.save();
    }

    res.status(201).json({
      message: "Tutorials created successfully",
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Tutorial creation failed", error: error.message });
  }
});

router.get("/get-signups", async (req, res) => {
  try {
    const tutorials = await Tutorial.find()
      .populate("teacher")
      .populate("students");
    res.status(200).json({ tutorials });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch tutorials", error: error.message });
  }
});

router.get("/get-personal-tutorials/:teacherId", async (req, res) => {
  const { teacherId } = req.params;
  try {
    const teacher = await Teacher.findOne({ userId: teacherId });
    console.log(teacher)
    const tutorialIds = teacher.createdTutorials;
    console.log("hey" + tutorialIds)
    const tutorialPromises = tutorialIds.map((tutorialId) => {
      return Tutorial.findById(tutorialId);
    });

    const tutorials = await Promise.all(tutorialPromises);

    res.status(200).json({ tutorials });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch tutorials", error: error.message });
  }
});

router.get("/fetch-user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    console.log(userId);
    const tutor = await User.findOne({ userId });
    res.status(200).json({ tutor });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch tutor", error: error.message });
  }
});

router.get("/fetch-students/:tutorialId", async (req, res) => {
  const { tutorialId } = req.params;
  try {
    //change path to students
    const tutorial = await Tutorial.findById(tutorialId).populate({
      path: "studentNames",
    });
    tutorial.numberSignedUp = tutorial.numberSignedUp + 1;
    tutorial.save();
    // const studentNames = tutorial.students.map((student) => {
    //   return student.name;
    // });
    const studentNames = tutorial.studentNames;
    res.status(200).json({ studentNames });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch students", error: error.message });
  }
});

router.post("/sign-up", async (req, res) => {
  const { studentId, name, tutorialId } = req.body;
  try {
    const student = await User.findOne({ userId: studentId.userId });
    const tutorial = await Tutorial.findById(tutorialId);
    if (!tutorial.students.includes(studentId)) {
      student.TutorialsAccepted.push(tutorial);
      tutorial.students.push(student);
      tutorial.studentNames.push(name);

      await student.save();
      await tutorial.save();
    }

    res
      .status(200)
      .json({ message: "Signed up successfully", tutorial: tutorial });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to sign up", error: error.message });
  }
});

router.delete("/delete-tutorial/:tutorialId", async (req, res) => {
  const { tutorialId } = req.params;
  try {
    const tutorial = await Tutorial.findById(tutorialId);
    //const teacher = await User.findById(tutorial.teacher);
    const students = tutorial.students;
    for (const student of students) {
      const studentUser = await User.findById(student);
      studentUser.TutorialsAccepted.pull(tutorial);
      await studentUser.save();
    }
    //teacher.tutorialsRequest.pull(tutorial);
    // await teacher.save();
    await Tutorial.findByIdAndDelete(tutorialId);
    res.status(200).json({ message: "Tutorial deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete tutorial", error: error.message });
  }
});

router.delete("/delete-all-tutorials", async (req, res) => {
  try {
    const tutorials = await Tutorial.find();
    for (const tutorial of tutorials) {
      const students = tutorial.students;

      for (const student of students) {
        const studentUser = await User.findById(student);
        if (studentUser) {
          studentUser.TutorialsAccepted.pull(tutorial);
          await studentUser.save();
        }
      }
      await Tutorial.findByIdAndDelete(tutorial._id);
    }

    res.status(200).json({ message: "All tutorials deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete all tutorials", error: error.message });
  }
});

export default router;
