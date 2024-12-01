import express from 'express';
import cors from 'cors';
import urlRoutes from './routes/urlRoutes.js'; // ודא שהנתיב נכון
import fileRoutes from './routes/fileRoutes.js';
import emailRoutes from './routes/emailRoutes.js';
/**
 * Main application setup for Express server.
 * This file configures middleware, routes, and error handling for the API.
 */
const app = express();
const corsOptions = {
    origin: [
        'http://localhost:5175', 
        'http://localhost:5174',
        'http://localhost:5173',
        'https://mail.google.com'
    ], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true 
};
// Middleware for Cross-Origin Resource Sharing
app.use(cors(corsOptions));
// Middleware for parsing JSON bodies
app.use(express.json());
// Route for handling file analysis
app.use('/file', fileRoutes);
// Route for handling url analysis
app.use('/url', urlRoutes);
// Route for handling email analysis
app.use('/email', emailRoutes);
// Generic error handler
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
