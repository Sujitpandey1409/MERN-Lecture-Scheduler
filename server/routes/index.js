import express from 'express';
const router = express.Router();
import instructorRoutes from './instructorRoutes.js';
import courseRoutes from './courseRoutes.js';  
import lectureRoutes from './lectureRoutes.js';    

router.use('/instructors', instructorRoutes);
router.use('/courses', courseRoutes);  
router.use('/lectures', lectureRoutes); 

export default router