import UserService from '../services/user-service.js';
import User from '../models/user.js';

const userService = new UserService();

export const signUp = async (req,res) => {
    try {
        const response = await userService.signUp({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        })
        return res.status(201).json({
            success: true,
            message: 'Successfully signed up',
            data: response,
            err: {}
        });
    }
    catch(err) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: err
        })
    }
}

export const login = async (req,res) => {
    try {
        const response = await userService.signIn({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(200).json({
            message: 'Successfully logged in',
            data: response,
            success: true,
            err: {}
        });
    } 
    catch(err) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: err
        })
    }
}
