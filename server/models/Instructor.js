import mongoose from 'mongoose';

const instructorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
});

export default mongoose.model('Instructor', instructorSchema);
