const mongoose = require('mongoose');

const hashtagSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    tweets: [ // there will be multiple tweets belong to a hashtag
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tweet'
        }
    ]
}, { timestamps: true });

const Hashtag = mongoose.model('Hashtag', hashtagSchema);
module.exports = Hashtag;