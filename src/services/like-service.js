import {LikeRepository, TweetRepository } from '../repository/index.js';

class LikeService {
    constructor() {
        this.LikeRepository = new LikeRepository();
        this.TweetRepository = new TweetRepository();
    }

    async toggleLike(modelId, modelType, userId) {
        let likeable;
        if(modelType === 'Tweet') {
            likeable = await this.TweetRepository.get(modelId);
        }
        else if(modelType === 'Comment') {
            // TO DO
        }
        else{
            throw new Error("Unknown model type");
        }
        if (!likeable) {
            throw new Error(`${modelType} not found: ${modelId}`);
        }
        const likeExists = await this.LikeRepository.findByUserIdAndLikeable({
            user: userId,
            likeable: modelId,
            onModel: modelType
        });

        if(likeExists) {
            likeable.likes.pull(likeExists._id);
            await likeable.save();
            await this.LikeRepository.destroy(likeExists._id);
            return false;
        }
        const newLike = await this.LikeRepository.create({
            user: userId,
            likeable: modelId,
            onModel: modelType
        });
        likeable.likes.push(newLike._id);
        await likeable.save();
        return true;
    }
}

export default LikeService;