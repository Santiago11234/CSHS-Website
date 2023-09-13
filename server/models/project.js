import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  file: { type: String, required: true },
},
{ timestamps: true, toJSON: { virtuals: true }}
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
