import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  file: { type: String, required: true },
},
{ timestamps: true, toJSON: { virtuals: true }}
);

const Article = mongoose.model('Article', articleSchema);

export default Article;
