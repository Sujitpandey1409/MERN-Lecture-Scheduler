import Instructor from '../models/Instructor.js';

export const getAllInstructors = async () => {
  return await Instructor.find();
};

export const updateInstructor = async (id, data) => {
  return await Instructor.findByIdAndUpdate(id, data ,{
    new: true, // Returns updated instructor
    runValidators: true, // Ensures validation
  });;
};

export const deleteInstructor = async (id, data) => {
  return await Instructor.findByIdAndDelete(id)
};

export const createInstructor = async (data) => {
    const { name, email } = data;
    if (!name || !email) {
      const error = new Error('Name and email are required');
      error.statusCode = 400;
      throw error;
    }
    return await Instructor.create({ name, email });
  };
  
