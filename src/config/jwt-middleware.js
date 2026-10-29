import JWT from 'passport-jwt';
import User from '../models/user.js';

const JwtStrategy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;

const options = { // options are basically the configuration for the JWT strategy
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export const passportAuth = (passport) => {
    passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
        const user = await User.findById(jwtPayload.id);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    }));
}