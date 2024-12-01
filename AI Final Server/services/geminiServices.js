import { GoogleGenerativeAI } from "@google/generative-ai";
/**
 * Service for interacting with Google's Gemini AI.
 * This service provides generative content analysis for email and file data.
 */

class GeminiService {
      /**
     * Analyzes the provided prompt using Gemini AI.
     * @param {string} prompt - The input prompt for the AI model.
     * @returns {Promise<Object>} - The analysis result.
     */
    static async analyze(prompt) {
        const apiKey = process.env.GOOGLE_GEN_AI_KEY || 'AIzaSyBbQqiH9nS0l0kinVtEQ9UF4t6LSzxR4rY';

        if (!apiKey) {
            console.error("API key is missing. Ensure it's set in the environment variables.");
            return { success: false, error: "API key is not configured." };
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        try {
            console.info("Sending prompt to Gemini for analysis.");

            const result = await model.generateContent([
                {
                    text: prompt,
                },
            ]);

            if (!result?.response?.candidates?.[0]?.content?.parts?.[0]?.text) {
                throw new Error("Unexpected response structure from Gemini API.");
            }

            const analyzedText = result.response.candidates[0].content.parts[0].text;

            console.info("Successfully analyzed text with Gemini.");
            return { success: true, analysis: analyzedText };
        } catch (error) {
            console.error("Error during analysis:", error);
            return { success: false, error: error.message };
        }
    }
}

export default GeminiService;
