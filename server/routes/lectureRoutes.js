import express from 'express';
import { getLecture, addLecture } from '../controllers/lectureController.js';

const router = express.Router();

router.get('/', getLecture);
router.post('/', addLecture);

export default router;
