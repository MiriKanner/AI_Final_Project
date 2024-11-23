import axios from 'axios';


// const getAnalysisDetails = async (selfLink) => {
//     const apiKey = process.env.VIRUS_TOTAL_API_KEY || '6cc3d3581f7bdf7754539df7242b3962b1a3618c419284223c74785a551c841a';

//     try {
//         const response = await axios.get(selfLink, {
//             headers: {
//                 'x-apikey': apiKey,
//             },
//         });

//         console.log(response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching analysis details:', error);
//         throw error;
//     }
// };


export const checkUrlWithVirusTotal = async (url) => {
    console.log('check url with virus total')
    console.log(process.env.VIRUS_TOTAL_API_KEY)
    const apiKey = process.env.VIRUS_TOTAL_API_KEY || '7d9ed99294e89f13d5eb4905b8f901344bb67906652393d5d79fed44a7ef02be';
    console.log(apiKey)
    const requestData = { url: 'string' };
    const response = await axios.post(
        'https://www.virustotal.com/api/v3/urls',
         requestData ,
        {
            headers: {
                'x-apikey': apiKey,
                'Content-Type': 'application/json',
            },
        }
    );
    console.log(response)
    return response.data;
    // const selfLink = response.data.links.self;
    // const analysisDetails = await getAnalysisDetails(selfLink);
    // console.log(analysisDetails)
    // return analysisDetails;
};
