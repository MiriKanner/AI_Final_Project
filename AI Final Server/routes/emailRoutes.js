import express from 'express';
import { analyzeEmail } from '../controllers/emailController.js';
import { validateEmailContent } from '../middleware/inputValidation.js';

const router = express.Router();
// controller for handling email analysis
router.post('/analyze', validateEmailContent, analyzeEmail);

export default router;
