import axios from 'axios';


export const checkUrlWithVirusTotal = async (url) => {
    const response = await axios.post(
        'https://www.virustotal.com/api/v3/urls',
        { url },
        {
            headers: {
                'x-apikey': process.env.VIRUS_TOTAL_API_KEY,
            },
        }
    );
    return response.data;
};
