import { connect } from './config/database.js';
import express from 'express';
import { UserRepository, TweetRepository} from './repository/index.js';
import LikeService from './services/like-service.js';
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

        const userRepository = new UserRepository();
        const tweetRepository = new TweetRepository();

        const tweets = await tweetRepository.getAll(10, 0);
        let user = await userRepository.getByEmail('abc@gmail.com');
        if (!user) {
            user = await userRepository.create({
                name: 'John Doe',
                email: 'abc@gmail.com',
                password: 'password'
            });
        }

        if (tweets.length > 0) {
            const likeService = new LikeService();
            await likeService.toggleLike(tweets[0]._id, 'Tweet', user._id);
        } else {
            console.log('No tweets found; skipping startup like test.');
        }
    } catch (error) {
        console.error('Application initialization failed:', error);
    }
});