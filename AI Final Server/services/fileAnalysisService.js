import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

const API_KEY = '6cc3d3581f7bdf7754539df7242b3962b1a3618c419284223c74785a551c841a';

export const analyzeFile = async (filePath) => {
    try {
        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath)); // שימוש ב-Stream

        const response = await axios.post(
            'https://www.virustotal.com/api/v3/files',
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    'x-apikey': API_KEY,
                },
            }
        );

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error(`Error analyzing file: ${error.response.status} - ${error.response.data.error.message}`);
        } else {
            console.error('Error analyzing file:', error.message);
        }
        throw error;
    }
};
