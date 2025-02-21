import express from 'express';
import { getInstructors, updateInstructorController, deleteInstructorController, addInstructor } from '../controllers/instructorController.js';

const router = express.Router();

router.get('/', getInstructors);
router.post('/', addInstructor);
router.put('/:id', updateInstructorController);
router.delete('/:id', deleteInstructorController);

export default router;
