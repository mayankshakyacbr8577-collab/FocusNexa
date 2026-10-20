import express from 'express';
import { getWeeklyReport } from '../controllers/weeklyReportController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getWeeklyReport);

export default router;
