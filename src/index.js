const express = require('express');
const connect = require('./config/database');
const app = express();

const TweetRepository = require('./repository/tweet-repository');
const Comment = require('./models/comment');
const tweetRepo = new TweetRepository();

const PORT = process.env.PORT || 3000;

app.listen(PORT, async() => {
    console.log(`Server is running on port ${PORT}`);
    await connect();
    console.log('Connected to the database');
    // const tweet = await Tweet.create({
    //     content : 'Third tweet',
    // });

    // const tweet = await tweetRepo.create({ content : 'With hooks', userEmail : 'user@example.com' });
    // const comment = await Comment.create({ content: 'First comment'});
    // tweet.comments.push(comment);
    // await tweet.save();
    // const tweet = await tweetRepo.getAll(2, 0);
   
    // console.log(tweet[0].content);
});