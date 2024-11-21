import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiService {
    static async analyze(story) {
        const apiKey = process.env.GOOGLE_GEN_AI_KEY || 'AIzaSyBbQqiH9nS0l0kinVtEQ9UF4t6LSzxR4rY';
        
        if (!apiKey) {
            console.error("API key is missing. Ensure it's set in the environment variables.");
            return { success: false, error: "API key is not configured." };
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        try {
            // מתכונן הטקסט לסיכום
            const formattedStory = `Analyze the following story and provide insights on whether it is safe or suspicious. If suspicious, provide reasons and tips to handle such cases:\n\n${story}`;

            console.info("Formatted story content prepared for analysis.");

            // שליחת הטקסט ל-Gemini
            const result = await model.generateContent([
                {
                    text: formattedStory,
                },
            ]);

            if (!result?.response?.candidates?.[0]?.content?.parts?.[0]?.text) {
                throw new Error("Unexpected response structure from Gemini API.");
            }

            const analyzedText = result.response.candidates[0].content.parts[0].text;

            console.info("Successfully analyzed story.");
            return { success: true, analysis: analyzedText };
        } catch (error) {
            console.error("Error during analysis:", error);
            return { success: false, error: error.message };
        }
    }
}

export default GeminiService;
