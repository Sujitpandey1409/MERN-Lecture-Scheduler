import Lecture from '../models/Lecture.js';

// export const getAllLecture = async () => {
//   return await Lecture.find();
// };
export const getAllLectures = async (req, res) => {
  try {
    return await Lecture.find()
      .populate("course", "name") // Populate course name
      .populate("instructor", "name"); // Populate instructor name

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const scheduleLecture = async (data) => {
    const { course, instructor, date } = data;
    if (!course || !instructor || !date) {
      const error = new Error('Course, Instructor, and Date are required');
      error.statusCode = 400;
      throw error;
    }
  
    const conflict = await Lecture.findOne({ instructor, date });
    if (conflict) {
      const error = new Error('Instructor already has a lecture on this date');
      error.statusCode = 400;
      throw error;
    }
  
    return await Lecture.create({ course, instructor, date });
  };
  
  