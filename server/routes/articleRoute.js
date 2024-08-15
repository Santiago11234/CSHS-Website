import express from 'express';
import mongoose from 'mongoose';
import Article from '../models/article.js';


const router = express.Router();


router.post('/upload', async (req, res) => {
    try {
      const { author, title, description, imgUrl, articleUrl } = req.body;
      const newArticle = new Article({
        author,
        title,
        description,
        image: imgUrl,
        article: articleUrl,
      });
  
      const savedArticle = await newArticle.save();
  
      res.status(201).json(savedArticle);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router