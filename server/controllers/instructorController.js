import asyncHandler from 'express-async-handler';
import { getAllInstructors, createInstructor, updateInstructor, deleteInstructor} from '../services/instructorService.js';

// Get all instructors
export const getInstructors = asyncHandler(async (req, res) => {
  const instructors = await getAllInstructors();
  res.status(200).json(instructors);
});

// Create new instructor
export const addInstructor = asyncHandler(async (req, res) => {
  const newInstructor = await createInstructor(req.body);
  res.status(201).json(newInstructor);
});

// Update a instructor
export const updateInstructorController = asyncHandler(async (req, res) => {
  const newInstructor = await updateInstructor(req.params.id, req.body);
  res.status(201).json(newInstructor);
  console.log(req.params.id, req.body);
  
});

// Delete a instructor
export const deleteInstructorController = asyncHandler(async (req, res) => {
  const newInstructor = await deleteInstructor(req.params.id);
  res.status(201).json('deleted succesfully');
});
