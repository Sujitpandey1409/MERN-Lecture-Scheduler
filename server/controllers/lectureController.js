import asyncHandler from 'express-async-handler';
import { getAllLectures, scheduleLecture } from '../services/lectureService.js';

export const getLecture = asyncHandler(async (req, res) => {
  const instructors = await getAllLectures();
  res.status(200).json(instructors);
});

export const addLecture = asyncHandler(async (req, res) => {
  const newLecture = await scheduleLecture(req.body);
  res.status(201).json(newLecture);
});
