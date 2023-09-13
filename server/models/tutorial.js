import mongoose from 'mongoose';

const tutorialSchema = new mongoose.Schema({
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    teacherName: { type: String, required: false },
    csClass: { type: String, required: false },
    classroom: { type: String, required: false },
    type: { type: String, required: false },
    alert: { type: Boolean, default: false },
    teacherEmail: { type: String, required: false },
    date: { type: Date, required: false },
    finishDate: { type: Date, required: false },
    time: { type: String, required: false },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    studentNames: [{ type: String }],
    numberSignedUp: { type: Number, default: 0 },
},
{ timestamps: true, toJSON: { virtuals: true }}
);

const Tutorial = mongoose.model('Tutorial', tutorialSchema);

export default Tutorial;
