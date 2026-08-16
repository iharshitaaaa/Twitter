import mongoose from 'mongoose';

const connect = async () => {
    await mongoose.connect('mongodb://localhost:27017/twitter_dev');
};

export { connect };
export default connect;