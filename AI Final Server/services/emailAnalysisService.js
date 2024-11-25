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

Your response should be structured as follows:
- Phishing Likelihood: XX%
- Summary: ...
- Advice: ...
            `;

            const analysis = await GeminiService.analyze(prompt);

            if (!analysis.success) {
                throw new Error('Failed to analyze email content.');
            }

            return analysis.analysis;
        } catch (error) {
            console.error('Error analyzing email:', error.message);
            throw error;
        }
    }
}

export default EmailAnalysisService;
