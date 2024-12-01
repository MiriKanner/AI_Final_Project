import EmailAnalysisService from '../services/emailAnalysisService.js';
 /**
 * Controller for analyzeEmail.
 * this controller send the body to the service to check their contains.
 */

export const analyzeEmail = async (req, res) => {
    const { emailContent } = req.body;

    try {
        const analysis = await EmailAnalysisService.analyzeEmail(emailContent);
        console.log( "Email analysis result:", analysis);
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
