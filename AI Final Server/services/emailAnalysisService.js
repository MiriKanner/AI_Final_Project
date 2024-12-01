import GeminiService from './geminiServices.js';

/**
 * EmailAnalysisService is responsible for analyzing email content using an AI model.
 * It evaluates the likelihood of phishing, provides a summary, actionable advice, 
 * and identifies risk factors based on the given email content.
 */
class EmailAnalysisService {
    /**
     * Analyzes the provided email content for potential phishing attempts.
     *
     * @param {string} content - The content of the email to analyze.
     * @returns {Object} - An object containing the phishing likelihood, summary, advice, and risk factors.
     * @throws {Error} - Throws an error if the analysis fails.
     */
    static async analyzeEmail(content) {
        try {
            // Define the prompt for the AI model
            const prompt = `
            You are an AI trained to analyze email content for phishing attempts. Analyze the following email and provide the following structured response:
            1. **Phishing Likelihood:** Indicate the likelihood that the email is phishing (percentage).
            2. **Summary:** Provide a brief summary of the email's analysis, even if limited information is available.
            3. **Advice:** Provide detailed, actionable steps for the user to stay safe.
            4. **Risk Factors:** Identify and list categories of risk with their percentages.
            
            Response format:
            - **Phishing Likelihood:** XX%
            - **Summary:** Always include a summary, even if based on minimal information.
            - **Advice:** Include actionable steps for the user to follow.
            - **Risk Factors:** List categories with percentages (e.g., Suspicious URL: XX%).
            
            Email content:
            ${content}
            `;

            // Call the GeminiService to perform the analysis
            const analysis = await GeminiService.analyze(prompt);

            // Check if the analysis was successful
            if (!analysis.success) {
                throw new Error('Failed to analyze email content.');
            }

            const rawResult = analysis.analysis;
            // Ensure the data is a string
            const textResult = typeof rawResult === 'string' ? rawResult : JSON.stringify(rawResult);

            // Split lines and clean formatting
            const lines = textResult.split('\n').map(line => line.replace(/[*\-]/g, '').trim());

            // Extract phishing likelihood
            const likelihoodLine = lines.find(line => line.toLowerCase().includes('phishing likelihood'));
            const phishingLikelihood = likelihoodLine
                ? parseInt(likelihoodLine.split(':')[1].trim().replace('%', ''))
                : 0;

            // Identify indices for sections in the response
            const summaryIndex = lines.findIndex(line => line.toLowerCase().includes('summary'));
            const adviceIndex = lines.findIndex(line => line.toLowerCase().includes('advice'));
            const riskFactorsIndex = lines.findIndex(line => line.toLowerCase().includes('risk factors'));

            if (summaryIndex === -1) {
                console.warn('Summary section not found. Defaulting to "No summary provided."');
            }

            if (adviceIndex === -1) {
                throw new Error('Advice section not found in the analysis result.');
            }

            if (riskFactorsIndex === -1) {
                throw new Error('Risk Factors section not found in the analysis result.');
            }
                const advice = lines.slice(adviceIndex + 1, riskFactorsIndex).join('\n').trim();

            // Parse risk factors
            const riskFactors = {};
            const riskLines = lines.slice(riskFactorsIndex + 1);
            for (const line of riskLines) {
                if (line.includes(':')) {
                    const [category, percentage] = line.split(':');
                    riskFactors[category.trim()] = parseInt(percentage.trim().replace('%', ''));
                }
            }
            const regex = /- \*\*Summary:\*\*(.*?)- \*\*Advice:\*\*/s;

            const summary = rawResult.match(regex);
    
            // Return the structured result
            return {
                phishingLikelihood,
                summary,
                advice,
                riskFactors,
            };
        } catch (error) {
            console.error('Error analyzing email:', error.message, error.stack);
            throw error;
        }
    }
}

export default EmailAnalysisService;
