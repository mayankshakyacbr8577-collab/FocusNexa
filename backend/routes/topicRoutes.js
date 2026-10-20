import express from 'express';
import {
  getTopics,
  createTopic,
  updateTopic,
  deleteTopic,
} from '../controllers/topicController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getTopics)
  .post(protect, createTopic);

router.route('/:id')
  .put(protect, updateTopic)
  .delete(protect, deleteTopic);

export default router;
