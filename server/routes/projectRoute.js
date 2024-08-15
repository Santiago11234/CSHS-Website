import express from 'express';
import mongoose from 'mongoose';
import Project from '../models/project.js';


const router = express.Router();


router.post('/upload', async (req, res) => {
    try {
      const { author, title, description, imgUrl, link } = req.body;
      const newProject = new Project({
        author,
        title,
        description,
        image: imgUrl,
        link
      });
  
      const savedProject = await newProject.save();
  
      res.status(201).json(savedProject);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router