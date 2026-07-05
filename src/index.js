const express = require('express');
const connect = require('./config/database');
const app = express();

const TweetRepository = require('./repository/tweet-repository');
const Comment = require('./models/comment');
const Tweet = require('./models/tweet');
const tweetRepo = new TweetRepository();

const PORT = process.env.PORT || 3000;

app.listen(PORT, async() => {
    console.log(`Server is running on port ${PORT}`);
    await connect();
    console.log('Connected to the database');
    const tweets = await Tweet.findById({
    content: ["First tweet", "Second tweet", "Third tweet", "2y654333"],
   })
   console.log(tweets);
});