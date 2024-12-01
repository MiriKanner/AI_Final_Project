import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import GeminiService from "./geminiServices.js";
/**
 * Service for analyzing files for potential threats.
 * This service interfaces with VirusTotal and other analysis providers to evaluate file safety.
 */

const API_KEY = "6cc3d3581f7bdf7754539df7242b3962b1a3618c419284223c74785a551c841a";

class FileAnalysisService {
       /**
     * Analyzes the provided file.
     * @param {Buffer} fileBuffer - The file data as a buffer.
     * @param {string} fileName - The name of the file.
     * @returns {Promise<Object>} - Analysis results.
     * @throws {Error} - Throws an error if the analysis fails.
     */
    static async analyzeFile(filePath) {
        try {
             // Perform analysis using VirusTotal
            const formData = new FormData();
            formData.append("file", fs.createReadStream(filePath));

            const response = await axios.post(
                "https://www.virustotal.com/api/v3/files",
                formData,
                {
                    headers: {
                        ...formData.getHeaders(),
                        "x-apikey": API_KEY,
                    },
                }
            );

            const virusTotalResult = {
                id: response.data.data.id,
                type: response.data.data.type,
                analysisLink: response.data.data.links?.self || "No link provided",
            };

            const prompt = `
You are an AI specialized in file safety analysis. Analyze the following file metadata:
- File ID: ${virusTotalResult.id}
- File Type: ${virusTotalResult.type}
- Analysis Link: ${virusTotalResult.analysisLink}

Your tasks:
1. Summarize the key findings of this file's analysis.
2. Evaluate whether the file poses any security risks and explain why.
3. Provide actionable advice for the user to address these risks.

Your response should be structured as follows:
- Summary: ...
- Risk Evaluation: ...
- Advice: ...
            `;

            const geminiAnalysis = await GeminiService.analyze(prompt);
            if (!geminiAnalysis.success) {
                throw new Error("Failed to analyze file content with Gemini.");
            }

            return {
                message: "File analyzed successfully",
                virusTotalData: virusTotalResult,
                geminiAnalysis: geminiAnalysis.analysis,
            };
        } catch (error) {
            console.error("Error analyzing file:", error.message);
            throw error;
        }
    }
}

export default FileAnalysisService;
