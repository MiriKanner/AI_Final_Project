import express from 'express';
import multer from 'multer';
import { uploadAndAnalyzeFile } from '../controllers/fileController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // תיקיית אחסון זמני

// מסלול לניתוח קבצים
router.post('/analyze', upload.single('file'), uploadAndAnalyzeFile);

export default router;
