import Like from '../models/like.js';
import CrudRepository from './crud-repository.js';

class LikeRepository extends CrudRepository {

    constructor() {
        super (Like);
    }

    async findByUserIdAndLikeable (data) {
        try{
            const like = await Like.findOne(data);
            return like;
        }
        catch (error) {
            console.error("Something went wrong in like repository", error);
            throw error;
        }
    }
}

export default LikeRepository;
