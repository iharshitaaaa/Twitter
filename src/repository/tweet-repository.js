const Tweet = require('../models/tweet');

class TweetRepository {

    async create(data){
        try {
            const tweet = await Tweet.create(data);
            return tweet;
        }
        catch (error) {
            console.log('Error in creating tweet', error);
        }
    }

    async get (id) {
        try {
            const tweet = await Tweet.findById(id);
            return tweet;
        }
        catch (error) {
            console.log('Error in fetching tweet', error);
        }
    }

    async delete (id) {
        try {
            const tweet = await Tweet.findByIdAndRemove(id);
            return tweet;
        }
        catch (error) {
            console.log('Error in deleting tweet', error);
        }
    }

    async populateComments (tweetId) {
        try {
            const tweet = await Tweet.findById(tweetId).populate({path: 'comments'}).lean(); // use path when you have nested documents. // lean to convert to normal js object.
            return tweet;
        }
        catch (error) {
            console.log('Error in populating comments', error);
        }
    }

    async getAll (limit, offset) {
        try {
            const tweet = await Tweet.find().limit(limit).skip(offset);
            return tweet;
        }
        catch (error) {
            console.log('Error in fetching all tweets', error);
        }
    }
}

module.exports = TweetRepository;
