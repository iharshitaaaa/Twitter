// this middleware act as a gatekeeper before the routes for creating tweet, creating comment runs. It checks if the user is authenticated by verifying the JWT token and attaches the user object to the request if valid. If not, it returns a 401 Unauthorized response.

import passport from 'passport';

export const authenticate = (req, res, next) => {
    passport.authenticate('jwt', (err, user) => {
        if(err) next(err);
        if(!user) {
            return res.status(401).json({
                message: 'Unauthorized access'
            })
        }
        req.user = user; // authenticated req can access the user object from the token 
        next();
    }) (req, res, next);
}

// Typical flow:
// 1. User logs in
// 2. Server creates a JWT and sends it to the client
// 3. Client sends it on future requests as: Authorization: Bearer <token>
// 4. This middleware validates the token
// 5. If valid, the request proceeds
// 6. If invalid or missing, the request is blocked