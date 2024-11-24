import axios from 'axios';

export const checkUrlWithVirusTotal = async (url) => {
    console.log('Checking URL with VirusTotal');
    const apiKey = process.env.VIRUS_TOTAL_API_KEY || '7d9ed99294e89f13d5eb4905b8f901344bb67906652393d5d79fed44a7ef02be';

    try {
        // שליחת הבקשה הראשונית ל-VirusTotal
        const response = await axios.post(
            'https://www.virustotal.com/api/v3/urls',
            `url=${encodeURIComponent(url)}`, // הגוף חייב להיות מקודד
            {
                headers: {
                    'x-apikey': apiKey,
                    'Content-Type': 'application/x-www-form-urlencoded', // פורמט נכון
                },
            }
        );

        // החזרת מזהה הבדיקה
        const analysisId = response.data.data.id;
        console.log(`Analysis ID: ${analysisId}`);

        // בדיקת סטטוס הניתוח
        const analysisResponse = await axios.get(
            `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
            {
                headers: {
                    'x-apikey': apiKey,
                },
            }
        );

        console.log('Analysis Response:', analysisResponse.data);
        return analysisResponse.data;
    } catch (error) {
        console.error('Error communicating with VirusTotal:', error.response?.data || error.message);
        throw new Error('Failed to communicate with VirusTotal');
    }
};
