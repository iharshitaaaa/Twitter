import userRepository from '../repository/index.js';

class UserService {
    constructor() {
        this.userRepository = new userRepository.UserRepository();
    }

    async signUp(data) {
       try {
       const user = await this.userRepository.create(data); 
       return user;
       }
       catch(err) {
           throw err;
       }
    }

    async getUserByEmail(email) {
        try {
            const user = await this.userRepository.getByEmail(email);
            return user;
        }
        catch(err) {
            throw err;
        }
    }

    async signIn (data) {
        try {
            const user = await this.getUserByEmail(data.email);
            if(!user) {
                throw new Error('User not found');
            }
            if(!user.comparePassword(data.password)) {
                throw new Error('Incorrect password');
            }
            const token = user.genJWT();
            return token;
        }
        catch(err) {
            throw err;
        }
    }
}

export default UserService;