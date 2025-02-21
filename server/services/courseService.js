import Course from '../models/Course.js';

// Get all courses
export const getAllCourses = async () => {
  return await Course.find();
};

// Create a new course
export const createCourse = async (data) => {
    const { name, level, description, image } = data;
    if (!name || !level || !description || !image) {
      const error = new Error('All fields are required');
      error.statusCode = 400;
      throw error;
    }
    return await Course.create({ name, level, description, image });
  };
  
