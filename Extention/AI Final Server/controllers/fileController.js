import FileAnalysisService from '../services/fileAnalysisService.js'; // ייבוא השירות המעודכן

export const uploadAndAnalyzeFile = async (req, res) => {
    try {
        // בדיקה אם קובץ הועלה
        if (!req.file) {
            console.warn('No file uploaded in the request.');
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        // קריאה לפונקציה לניתוח הקובץ
        const analysisResult = await FileAnalysisService.analyzeFile(req.file.path);

        // החזרת התוצאה ללקוח
        return res.status(200).json({
            message: 'File analyzed successfully',
            data: analysisResult,
        });
    } catch (error) {
        // טיפול בשגיאות ותיעוד ללוגים
        console.error('Error in uploadAndAnalyzeFile:', error);

        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data?.error?.message || error.message;

        return res.status(statusCode).json({
            error: errorMessage,
        });
    }
};
