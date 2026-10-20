import {CommentRepository, TweetRepository} from "../repository/index.js";
class CommentService {
    constructor () {
        this.commentRepo = new CommentRepository();
        this.tweetRepo = new TweetRepository();
    }

    async createComment (userId, modelType, modelId, content) {
        if(modelType === 'Tweet') { // if the comment is on a tweet
            var commentable = await this.tweetRepo.get(modelId);
            console.log(commentable);
        }
        else if (modelType === 'Comment') { // if the comment is on a comment
            var commentable = await this.commentRepo.get(modelId);
        }
        else{
            throw new Error('Unknown model type');
        }
        // create a comment
        const comment = await this.commentRepo.create({
            content: content,
            userId: userId,
            onModel: modelType,
            commentable: modelId,
            comments: []
        });

        commentable.comments.push(comment); // add the comment to the comments array of the tweet or comment
        await commentable.save(); // save the tweet or comment with the new comment
        return comment;
    }
}
export default CommentService;

