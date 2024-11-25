import { analyzeFile } from '../services/fileAnalysisService.js';

export const uploadAndAnalyzeFile = async (req, res) => {
    try {
        
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        const analysisResult = await analyzeFile(req.file.path);

        res.json({
            message: 'File analyzed successfully',
            data: analysisResult,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
