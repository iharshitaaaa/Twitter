import mongoose from 'mongoose';

const hashtagSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    tweets: [ // there will be multiple tweets belong to a hashtag
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tweet'
        }
    ]
}, { timestamps: true });

// In hashtag we should create a hook which will ensure we only store lower case hashtags
hashtagSchema.pre('save', function (next){
    this.title = this.title.toLowerCase();
    next();
})
const Hashtag = mongoose.model('Hashtag', hashtagSchema);
export default Hashtag;