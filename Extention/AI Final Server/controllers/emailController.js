import EmailAnalysisService from '../services/emailAnalysisService.js';

export const analyzeEmail = async (req, res) => {
    const { emailContent } = req.body;

    if (!emailContent) {
        return res.status(400).json({
            message: 'Email content is required',
        });
    }

    try {
        const analysis = await EmailAnalysisService.analyzeEmail(emailContent);
        res.json({
            message: 'Email analyzed successfully',
            data: analysis,
        });
    } catch (error) {
        console.error('Error analyzing email:', error); // לוג שגיאות
        res.status(500).json({
            message: 'Error analyzing email',
            error: error.message,
        });
    }
};
