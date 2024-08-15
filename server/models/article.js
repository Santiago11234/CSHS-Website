import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  author: {type: String, required: true},
  title: { type: String, required: true },
  description: { type: String, required: true},
  image: { type: String, required: true },
  article: { type: String, required: true },
},
{ timestamps: true, toJSON: { virtuals: true }}
);

const Article = mongoose.model('Article', articleSchema);

export default Article;
