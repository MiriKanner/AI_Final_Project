import  GeminiService  from '../services/geminiServices.js';

export const checkStory = async (req, res) => {
    console.log('check story')

    const { story } = req.body;
    try {
        // שליחת הסיפור ל-Gemini AI לניתוח
        console.log('try gemini')
        const geminiResult = await GeminiService.analyze({ story });
        console.log('wow gemini')

        // החזרת תשובה ללקוח
        res.json({ message: 'Story analyzed successfully', data: geminiResult });
    } catch (error) {
        res.status(500).json({ message: 'Error analyzing story', error: error.message });
    }
};
