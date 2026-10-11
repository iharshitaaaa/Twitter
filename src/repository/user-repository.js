import User from '../models/user.js';
import CrudRepository from './crud-repository.js';

class UserRepository extends CrudRepository {

    constructor() {
        super (User);
    }

    async getByEmail(email) {
        return User.findOne({ email });
    }

}

export default UserRepository;