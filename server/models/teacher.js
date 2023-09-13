import mongoose from 'mongoose';
import Tutorial from './tutorial.js';

const teacherSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: '' }, 
  profilePicture: { type: String, default: '' },
  CSCourses: [{ type: String, default: '' }],
  createdTutorials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tutorial' }],
  classRoom: { type: String, default: '' },
},
{ timestamps: true, toJSON: { virtuals: true }}
);

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
