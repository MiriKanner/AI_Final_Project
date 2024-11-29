import { checkUrlWithVirusTotal } from '../services/virusTotalServices.js';
import GeminiService from '../services/geminiServices.js';

export const checkUrl = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ success: false, message: 'URL is required' });
        }

        // קבלת תוצאות מ-VirusTotal
        const virusResult = await checkUrlWithVirusTotal(url);

        // חישוב אחוז ה-Undetected
        const totalEngines = Object.keys(virusResult).length;
        const undetectedCount = Object.values(virusResult).filter(result => result.category === 'undetected').length;
        const undetectedPercentage = ((undetectedCount / totalEngines) * 100).toFixed(2);

        // יצירת פרומפט ל-Gemini
        const rawAnalysis = JSON.stringify(virusResult, null, 2);
        const geminiPrompt = `
You are an AI responsible for analyzing VirusTotal results for a URL. Your tasks are as follows:
1. Provide a safety rating from 1 (least safe) to 10 (most safe) based on the data.
2. Summarize the analysis in a single sentence that is understandable to non-technical users.
3. Provide numerical statistics showing the percentage of safe scans versus other categories.
4. If the URL is deemed unsafe, recommend a similar, safe website or alternative action for the user.

The VirusTotal analysis data is as follows:
${rawAnalysis}
        `;

        // שליחת פרומפט ל-Gemini
        const geminiResult = await GeminiService.analyze(geminiPrompt);

        if (!geminiResult.success) {
            throw new Error('Gemini analysis failed');
        }

        // עיבוד התוצאה
        const formattedResponse = {
            phishingLikelihood: parseFloat(undetectedPercentage),
            summary: geminiResult.analysis.match(/Summary:\s*(.*)/)?.[1] || "No summary provided.",
            advice: geminiResult.analysis.match(/Advice:\s*(.*)/)?.[1] || "No advice provided.",
            riskFactors: {
                "Undetected Scans": undetectedPercentage,
                "Detected Threats": (100 - undetectedPercentage).toFixed(2),
            },
        };

        res.json({ success: true, data: formattedResponse });
    } catch (error) {
        console.error("Error analyzing URL:", error.message);
        res.status(500).json({ success: false, message: "Error analyzing URL" });
    }
};
