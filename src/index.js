import { connect } from './config/database.js';
import express from 'express';
import apiRoutes from './routes/index.js';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async() => {
    console.log(`Server is running on port ${PORT}`);
    try {
        await connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Application initialization failed:', error);
    }
});