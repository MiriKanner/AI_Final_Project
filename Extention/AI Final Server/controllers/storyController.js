import GeminiService from '../services/geminiServices.js';

export const checkStory = async (req, res) => {
    console.log('check story');
    const { story } = req.body;
    try {
        // המרת הסיפור למחרוזת טקסט פשוטה
        const formattedStory = `Analyze the following story:\n\n${story}`;

        // שליחת הסיפור ל-Gemini
        const geminiResult = await GeminiService.analyze(formattedStory);

        // החזרת תשובה ללקוח
        res.json({ message: 'Story analyzed successfully', data: geminiResult });
    } catch (error) {
        res.status(500).json({ message: 'Error analyzing story', error: error.message });
    }
};
