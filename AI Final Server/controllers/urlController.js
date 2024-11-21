import { checkUrlWithVirusTotal } from '../services/virusTotalServices.js';
import  GeminiService  from '../services/geminiServices.js';

export const checkUrl = async (req, res) => {
    console.log('check url')
    const { url } = req.body;
    try {
        // קריאה ל-VirusTotal
        const virusResult = await checkUrlWithVirusTotal(url);

        // שליחת התוצאה ל-Gemini AI
        const geminiResult = await GeminiService.analyze(virusResult);

        // החזרת תשובה ללקוח
        res.json({ message: 'URL checked successfully', data: geminiResult });
    } catch (error) {
        res.status(500).json({ message: 'Error checking URL', error: error.message });
    }
};
