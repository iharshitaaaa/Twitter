import hashtags from '../models/hashtags.js';
class HashtagRepository {

    async create(data){
        try {
            const hashtag = await hashtags.create(data);
            return hashtag;
        }
        catch (error) {
            console.log('Error in creating hashtag', error);
        }
    }

    async get (id) {
        try {
            const hashtag = await hashtags.findById(id);
            return hashtag;
        }
        catch (error) {
            console.log('Error in fetching hashtag', error);
        }
    }

    async delete (id) {
        try {
            const hashtag = await hashtags.findByIdAndRemove(id);
            return hashtag;
        }
        catch (error) {
            console.log('Error in deleting hashtag', error);
        }
    }

    async bulkCreate(data) {
        try {
            const tags = await hashtags.insertMany(data);
            return tags;
        } catch (error) {
            console.log('Error in bulk creating hashtags', error);
        }
    }

    async findByTitle(titleList) 
    { 
        try {
            const tags = await hashtags.find({
                title: { $in: titleList }
            }).select('title tweets');
            return tags;
        }
        catch (error) {
            console.log('Error in finding hashtags by title', error);
        }
}
}

export default HashtagRepository;
