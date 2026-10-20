import TweetService from '../services/tweet-service.js';

const tweetService = new TweetService();

export const createTweet = async (req, res) => {
    try {
        const tweet = await tweetService.create(req.body);
        res.status(201).json({
            success:true,
            data: tweet,
            message: 'Tweet created successfully',
            err: {}
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            data: {},
            message: 'Error in creating tweet',
            err: error
        })
    }
}

export const getTweet = async (req, res) => {
    try {
        const tweet = await tweetService.get(req.params.id);
        res.status(200).json({
            success:true,
            data: tweet,
            message: 'Tweet fetched successfully',
            err: {}
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            data: {},
            message: 'Error in fetching tweet',
            err: error
        })
    }
}