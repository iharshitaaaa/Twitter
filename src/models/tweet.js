import mongoose from 'mongoose';

// Schema is a blueprint for the data, it defines the structure of the document and the data types of each field
const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true, // only validation would be done on this
        max : [ 250, 'Tweet content should not be more than 250 characters',
        ]
    }
}, { timestamps: true} // add createdAt and updatedAt fields
);

//hashtags array is empty becuase we dont have an actual usecase to store the hashtags inside the tweet because we are not going to update the tweet anyway.

// model is for actual instance of the document
const Tweet = mongoose.model('Tweet', tweetSchema);
export default Tweet;