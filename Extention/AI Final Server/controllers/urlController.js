import { checkUrlWithVirusTotal } from '../services/virusTotalServices.js';
import GeminiService from '../services/geminiServices.js';

export const checkUrl = async (req, res) => {
    const { url } = req.body;

    try {
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

        // עיבוד הפלט מ-Gemini
        const formattedResponse = formatGeminiResponse(geminiResult.analysis, url, undetectedPercentage);

        // החזרת תשובה ללקוח
        res.json({
            message: 'URL checked successfully',
            data: formattedResponse,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error checking URL',
            error: error.message,
        });
    }
};

const formatGeminiResponse = (geminiAnalysis, url, undetectedPercentage) => {
    let additionalNote = '';
    if (undetectedPercentage > 20) {
        additionalNote = `⚠️ Note: A significant portion of scanners (${undetectedPercentage}%) were unable to classify the site. Exercise caution.`;
    }

    return `
### Analysis for: ${url}

${geminiAnalysis}

${additionalNote}

---

**Note:** The safety rating is based on VirusTotal's analysis and does not guarantee 100% safety. Always practice secure browsing habits.
    `;
};
