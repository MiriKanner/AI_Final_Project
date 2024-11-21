import express from 'express';
import { checkStory } from '../controllers/storyController.js';

const router = express.Router();

// Route לניתוח סיפור
router.post('', checkStory);

export default router;
