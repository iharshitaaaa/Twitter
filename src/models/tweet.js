const mongoose = require('mongoose');

// Schema is a blueprint for the data, it defines the structure of the document and the data types of each field
const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true, // only validation would be done on this
        max : [ 250, 'Tweet content should not be more than 250 characters',
        ]
    },  
    hashtags: [ // there will be multiple hashtags belong to a tweet
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hashtag'
        }
    ]
}, { timestamps: true} // add createdAt and updatedAt fields
);

// model is for actual instance of the document
const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;