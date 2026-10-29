import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    }
}, {timestamps: true});

// generating encrypted password before saving the user
userSchema.pre('save', function(){
    const user = this;
    const SALT = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = encryptedPassword;
})

// comparing the password entered by the user with the encrypted password in the database
userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

// generating JWT token for the user
userSchema.methods.genJWT = function generate() {
    return jwt.sign({ id: this._id, email: this.email}, process.env.JWT_SECRET, { expiresIn: '1h' });
}

const User = mongoose.model('User', userSchema);
export default User;