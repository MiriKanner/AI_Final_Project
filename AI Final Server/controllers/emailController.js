import EmailAnalysisService from '../services/emailAnalysisService.js';

export const analyzeEmail = async (req, res) => {
    const { emailContent } = req.body;

    try {
        const analysis = await EmailAnalysisService.analyzeEmail(emailContent);
        res.json({
            message: 'Email analyzed successfully',
            data: analysis,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error analyzing email',
            error: error.message,
        });
    }
};
