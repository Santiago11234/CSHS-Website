import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  author: {type: String, required: true},
  title: { type: String, required: true },
  description: { type: String, required: true},
  image: { type: String, required: true },
  link: { type: String, required: true },
},
{ timestamps: true, toJSON: { virtuals: true }}
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
