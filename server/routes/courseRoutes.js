import express from 'express';
import { getCourses, addCourse } from '../controllers/courseController.js';

const router = express.Router();

router.get('/', getCourses);
router.post('/', addCourse);

export default router;
