import axios from 'axios';

const API_KEY = process.env.VIRUS_TOTAL_API_KEY || '7d9ed99294e89f13d5eb4905b8f901344bb67906652393d5d79fed44a7ef02be';
/**
 * Service for interacting with VirusTotal API to analyze URLs and files for potential threats.
 */
export const checkUrlWithVirusTotal = async (url) => {
    try {
        const response = await axios.post(
            'https://www.virustotal.com/api/v3/urls',
            `url=${encodeURIComponent(url)}`,
            {
                headers: {
                    'x-apikey': API_KEY,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const analysisId = response.data.data.id;

        return await waitForAnalysisCompletion(analysisId);
    } catch (error) {
        console.error('Error communicating with VirusTotal:', error.response?.data || error.message);
        throw new Error('Failed to communicate with VirusTotal');
    }
};

const waitForAnalysisCompletion = async (analysisId) => {
    const MAX_RETRIES = 10;
    const RETRY_DELAY = 5000;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const response = await axios.get(
                `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
                {
                    headers: {
                        'x-apikey': API_KEY,
                    },
                }
            );

            const status = response.data.data.attributes.status;
            if (status === 'completed') {
                return response.data.data.attributes.results;
            }

            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        } catch (error) {
            console.error(`Error fetching analysis status (attempt ${attempt}):`, error.response?.data || error.message);
        }
    }

    throw new Error('Analysis did not complete in a timely manner.');
};
