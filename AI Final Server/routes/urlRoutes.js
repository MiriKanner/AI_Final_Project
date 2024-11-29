import express from 'express';
import { checkUrl } from '../controllers/urlController.js';
import { validateUrl } from '../middleware/inputValidation.js';

const router = express.Router();

// הגדרת נתיב לניתוח URL
router.post('/analyze', validateUrl, checkUrl);

export default router;
