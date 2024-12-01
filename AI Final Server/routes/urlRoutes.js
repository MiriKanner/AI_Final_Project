import express from 'express';
import { checkUrl } from '../controllers/urlController.js';
import { validateUrl } from '../middleware/inputValidation.js';

const router = express.Router();
// controller for handling url analysis
router.post('/analyze', validateUrl, checkUrl);

export default router;
