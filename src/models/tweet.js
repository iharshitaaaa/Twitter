const mongoose = require('mongoose');

// Schema is a blueprint for the data, it defines the structure of the document and the data types of each field
const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true, // only validation would be done on this
    },
    userEmail: {
        type: String,
    }, 
    comments: [ // array of comments, as one tweet can have multiple comments
        {
            type : mongoose.Schema.Types.ObjectId, // this will store the id of the comment document
            ref : 'Comment' //id stored in comments array is of Comment model
        }
    ]
}, { 
    timestamps: true // add createdAt and updatedAt fields
});

tweetSchema.virtual('contentWithEmail').get(function(){ // virtual of content with email
    return `${this.content} - ${this.userEmail}`;
})

// model is for actual instance of the document
const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;