import express from 'express';
import { checkUrl } from '../controllers/urlController.js';
import { validateUrl } from '../middleware/inputValidation.js';

const router = express.Router();

// בדיקות קלט ל-URL לפני הטיפול בבקשה
router.post('', validateUrl, checkUrl);

export default router;
