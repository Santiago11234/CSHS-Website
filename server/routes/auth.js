import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from "../models/user.js";
import Teacher from "../models/teacher.js";
import { v4 as uuidv4 } from "uuid";


const router = express.Router();

router.post('/student-register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userId = uuidv4(); 
    const name = '';
    const profilePicture = '';
    const grade = '';
    const currentCS = '';
    const TutorialsAccepted = [];
    const articles = [];
    const projects = [];
    const hours = 0;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      userId,
      email,
      password: hashedPassword,
      name,
      profilePicture,
      grade,
      currentCS,
      TutorialsAccepted,
      articles, 
      projects,
      hours,
    });
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error: error.message });
  }
});

router.post('/student-login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

  
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      res.status(500).json({ message: 'Login failed', error: error.message });
    }
});

router.post('/teacher-register', async (req, res) => {
  try {

    const { email, password, name, classRoom } = req.body;
    const userId = uuidv4();
    const profilePicture = "";
    const CSCourses = [];
    const createdTutorials = [];

    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Teacher already exists' });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newTeacher = new Teacher({
      userId,
      email,
      password: hashedPassword,
      name,
      profilePicture,
      CSCourses,
      createdTutorials,
      classRoom,
    });

    await newTeacher.save();

    res.status(201).json({ message: 'Teacher registered successfully', userId });
  } catch (error) {
    res.status(500).json({ message: 'Teacher registration failed', error: error.message });
  }
});

router.post('/teacher-login', async (req, res) => {
  try {

    const { email, password } = req.body;

    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, teacher.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }


    res.status(200).json({ message: 'Teacher logged in successfully', teacher });
  } catch (error) {
    res.status(500).json({ message: 'Teacher login failed', error: error.message });
  }
});

export default router;