import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import signToken from '../functions/signToken';
import validate from './../functions/validator'

/** User signup */
const signup = async (req: Request, res: Response, next: NextFunction) => {
    let { name, email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
        return res.status(500).json({
            message: "User already exist!"
        });
    }

    const { errors, isValid } = await validate.validateSignupInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        email,
        password
    });

    return newUser
        .save()
        .then(newUser => {
            signToken(newUser.id).then(token => {
                return res.status(201).json({
                    status: 'success',
                    message: 'User signup complete!',
                    token
                })
            });

        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

/** User login */
const login = async (req: Request, res: Response, next: NextFunction) => {
    let { email, password } = req.body;

    const { errors, isValid } = await validate.validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const user = await User.findOne({ email: email }).select('+password');

    if (!user || !(await user.comparePassword(password, user.password))) {
        return res.status(404).json({
            message: "Incorrect email or password!"
        });
    }
    const token = await signToken(user.id);
    return res.status(200).json({
        status: 'success',
        message: 'User login successful!',
        token
    })
};

/** User signup */
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    if (res.locals && res.locals.jwt && res.locals.jwt.id) {
        User.findById(res.locals.jwt.id)
            .then((users) => {
                return res.status(200).json({
                    users: users,
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    } else {
        return res.status(401).json({
            message: 'Unauthorised'
        })
    }
};

export default { getUsers, signup, login };