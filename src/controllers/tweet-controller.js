import TweetService from '../services/tweet-service.js';
import upload from '../config/s3-config.js';

const tweetService = new TweetService();

const singleUploader = upload.single('image'); // middleware to handle single file upload.

export const createTweet = async (req, res) => {
    try {
        singleUploader(req, res, async function(err, data) {
            if (err) {
                return res.status(500).json({ error: err});
            }
            console.log("Image URL is", req.file);
            const payload = req.body;
            payload.image = req.file.location; // Store the S3 file URL in the tweet data
            const tweet = await tweetService.create(payload);
            return res.status(201).json({
                success:true,
                data: tweet,
                message: 'Tweet created successfully',
                err: {}
            });
        });
           
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