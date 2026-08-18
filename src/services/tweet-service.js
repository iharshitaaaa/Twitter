import { TweetRepository, HashtagRepository } from '../repository/index.js';

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create (data){

        //TO-DO create hashtags and associate them with the tweet
        /**
         * 1. bulkcreate in mongoose
         * 2. filter title of hashtags based on multiple tags.
         * 3. How to add tweet id inside all the hashtags.
         */

        const content = data.content;
        let tags = content.match(/#[a-zA-Z0-9_]+/g)
            .map((tag) => tag.substring(1))
            .map(tag => tag.toLowerCase()); //this regex extracts all the hashtags and remove first char i.e. # from the tag and also convert the tags to lowercase.
        const tweet = await this.tweetRepository.create(data);
        let alreadyPresentTags = await this.hashtagRepository.findByTitle(tags);
        let titleOfPresentTags = alreadyPresentTags.map((tag) => tag.title); // gives the list of tags which are already present in the db
        // now we need to filter out the tags which are not present in the db
        let newTags = tags.filter((tag) => !titleOfPresentTags.includes(tag)); // gives the list of tags which are not present in the db

        newTags = newTags.map((tag) => { // we need to pass the object with title and tweet id to match the schema of hashtags.
            return {
                title: tag,
                tweets: [tweet._id] // as this tag will have the associated tweet id.
            }
        });

        // now all these new tags can be passed inside bulkCreate method 
        const response = await this.hashtagRepository.bulkCreate(newTags);
        // now we need to add the tweet id inside the already present tags as well.
        alreadyPresentTags.forEach((tag) => {
            if (!tag.tweets) {
                tag.tweets = [];
            }
            if (!tag.tweets.some((id) => id.toString() === tweet._id.toString())) {
                tag.tweets.push(tweet._id);
                tag.save();
            }
        });
        
        return tweet;
    }

}

export default TweetService;

/*
this is my first #tweet. I am so #excited #yo 
*/
