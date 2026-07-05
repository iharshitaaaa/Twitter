const {TweetRepository} = require('../repository/index');

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
    }

    async create (data){
        const content = data.content;
        const tags = content.match(/#[a-zA-Z0-9_]+/g); // this regex extracts hashtags.
        tags = tags.map((tag) => tag.substring(1)); // remove the first char i.e. # from the tag.
        console.log(tags);

        const tweet = await this.tweetRepository.create(data);

        //TO-DO create hashtags and associate them with the tweet
        /**
         * 1. bulkcreate in mongoose
         * 2. filter title of hashtags based on multiple tags.
         * 3. How to add tweet id inside all the hashtags.
         */
        return tweet;
    }

}

module.exports = TweetService;

/*
this is my first #tweet. I am so #excited #yo 
*/
