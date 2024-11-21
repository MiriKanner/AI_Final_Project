import express from 'express';
import { checkUrl } from '../controllers/urlController.js';
const router = express.Router();

// Route לבדיקת URL
router.post('', checkUrl);

export default router;
