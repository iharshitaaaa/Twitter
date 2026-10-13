import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Tweet', 'Comment'] // on what model comment can be done.
    },
    commentable: { // holds the id of the specific Tweet or Comment
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel' // it will be based on onModel field.
    }
}, { 
    timestamps: true 
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;