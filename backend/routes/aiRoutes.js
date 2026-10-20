import express from 'express';
import { getInsights, generateStudyPlan } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/insights', protect, getInsights);
router.post('/study-plan', protect, generateStudyPlan);

export default router;
