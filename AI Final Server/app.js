import express from 'express';
import cors from 'cors';
import urlRoutes from './routes/urlRoutes.js'; // ודא שהנתיב נכון
import storyRoutes from './routes/storyRoutes.js'; // ודא שהנתיב נכון

const app = express();

// הגדרת CORS - מאפשר לכל מקור (לא מומלץ בייצור)
app.use(cors({
    origin: 'http://localhost:5175', // כתובת ה-Frontend
}));

// שאר ההגדרות של השרת
app.use(express.json());

// ניתוב בקשות לנתיבים מוגדרים
app.use('/url', urlRoutes);
app.use('/story', storyRoutes);

// ניהול שגיאות בנתיבים שאינם קיימים
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// הפעלת השרת
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
