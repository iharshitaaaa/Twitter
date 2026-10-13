import mongoose from 'mongoose';

const LikeSchema = new mongoose.Schema({
    onModel : {
        type: String,
        required: true,
        enum: ['Tweet', 'Comment'] // on what model like can be done.
    }, // now if over the time I want like feature for stories also I can simply add it in the enum.
    likeable: {// holds the id of the specicic Tweet or Comment
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel' //it will be based on onModel field.
    },
    user: { // who liked the tweet or comment
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

const Like = mongoose.model('Like', LikeSchema);
export default Like;