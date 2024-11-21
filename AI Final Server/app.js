import express from 'express';
import bodyParser from 'body-parser';
import urlRoutes from './routes/urlRoutes.js';
import storyRoutes from './routes/storyRoutes.js';


const app = express();
app.use(bodyParser.json());
console.log('hello');
// Routes
app.use('/url', urlRoutes);
app.use('/story', storyRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
