import express from 'express';
import { checkStory } from '../controllers/storyController.js';
import { validateStory } from '../middleware/inputValidation.js';

const router = express.Router();

// בדיקות קלט לסיפור לפני הטיפול בבקשה
router.post('', validateStory, checkStory);

export default router;
