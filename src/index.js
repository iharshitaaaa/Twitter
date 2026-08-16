import { connect } from './config/database.js';
import express from 'express';
import TweetRepository from './repository/tweet-repository.js';
import TweetService from './services/tweet-service.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, async() => {
    console.log(`Server is running on port ${PORT}`);
    await connect();
    console.log('Connected to the database');
    let service = new TweetService();
    const tweet = await service.create({
        content: 'this is my first #tweet. I am so #excited #yo'
    })

});