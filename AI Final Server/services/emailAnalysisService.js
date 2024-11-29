import GeminiService from './geminiServices.js';

class EmailAnalysisService {
    static async analyzeEmail(content) {
        try {
            const prompt = `
You are an AI trained to detect phishing emails. Analyze the following email content:
${content}

Your tasks:
1. Evaluate the likelihood (percentage) that this email is a phishing attempt.
2. Summarize the key elements that indicate whether the email is phishing or not.
3. Provide actionable advice for the user to stay safe.
4. Provide risk factors as a list of categories with percentages.

Your response should be structured as follows:
- Phishing Likelihood: XX%
- Summary: ...
- Advice: ...
- Risk Factors:
  - Category A: XX%
  - Category B: XX%
  ...
            `;

            const analysis = await GeminiService.analyze(prompt);

            if (!analysis.success) {
                throw new Error('Failed to analyze email content.');
            }

            const rawResult = analysis.analysis;
            console.log('Raw analysis result:', rawResult);

            // וודא שהנתונים הם מחרוזת
            const textResult = typeof rawResult === 'string' ? rawResult : JSON.stringify(rawResult);

            // פיצול השורות וניקוי עיצוב
            const lines = textResult.split('\n').map(line => line.replace(/[*\-]/g, '').trim());

            const phishingLikelihood = parseInt(
                lines.find(line => line.includes('Phishing Likelihood')).split(':')[1].trim().replace('%', '')
            );

            const summaryIndex = lines.findIndex(line => line.includes('Summary'));
            const adviceIndex = lines.findIndex(line => line.includes('Advice'));
            const riskFactorsIndex = lines.findIndex(line => line.includes('Risk Factors'));

            const summary = lines.slice(summaryIndex + 1, adviceIndex).join(' ').trim();
            const advice = lines.slice(adviceIndex + 1, riskFactorsIndex).join('\n').trim();

            const riskFactors = {};
            const riskLines = lines.slice(riskFactorsIndex + 1);
            for (const line of riskLines) {
                if (line.includes(':')) {
                    const [category, percentage] = line.split(':');
                    riskFactors[category.trim()] = parseInt(percentage.trim().replace('%', ''));
                }
            }

            return {
                phishingLikelihood,
                summary,
                advice,
                riskFactors,
            };
        } catch (error) {
            console.error('Error analyzing email:', error.message);
            throw error;
        }
    }
}

export default EmailAnalysisService;
