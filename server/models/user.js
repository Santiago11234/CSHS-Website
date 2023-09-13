import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: '' }, 
  profilePicture: { type: String, default: '' },
  grade: { type: String, default: '' }, 
  currentCS: { type: String, default: '' },
  TutorialsAccepted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tutorial' }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  hours: { type: Number, default: 0 },
},
{ timestamps: true, toJSON: { virtuals: true }}
);

const User = mongoose.model('User', userSchema);

export default User;
