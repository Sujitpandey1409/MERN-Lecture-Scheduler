import asyncHandler from 'express-async-handler';
import { getAllCourses, createCourse } from '../services/courseService.js';

// Get all courses
export const getCourses = asyncHandler(async (req, res) => {
  const courses = await getAllCourses();
  res.status(200).json(courses);
});

// Create new course
export const addCourse = asyncHandler(async (req, res) => {
  const newCourse = await createCourse(req.body);
  res.status(201).json(newCourse);
});
