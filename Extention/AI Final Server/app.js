import express from 'express';
import cors from 'cors';
import urlRoutes from './routes/urlRoutes.js'; // ודא שהנתיב נכון
import fileRoutes from './routes/fileRoutes.js';
import storyRoutes from './routes/storyRoutes.js'; // ודא שהנתיב נכון
import emailRoutes from './routes/emailRoutes.js';

const app = express();

// הגדרת CORS - שילוב כל המקורות במבנה אחד
const corsOptions = {
    origin: [
        'http://localhost:5175', 
        'http://localhost:5174',
        'https://mail.google.com'
    ], // הוספת כל המקורות הנדרשים
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // שיטות HTTP שמותרות
    credentials: true // מאפשר שימוש בקוקיז אם נדרש
};

app.use(cors(corsOptions));

// הגדרת JSON
app.use(express.json());

// ניתוב בקשות לנתיבים מוגדרים
app.use('/file', fileRoutes);
app.use('/url', urlRoutes);
app.use('/story', storyRoutes);
app.use('/email', emailRoutes);

// ניהול שגיאות בנתיבים שאינם קיימים
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// הפעלת השרת
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
