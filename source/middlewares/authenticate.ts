import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import User from "../models/user";

const getAuthToken = async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorised'
        })
    }

    jwt.verify(token, config.token.secret, (error, decoded: any) => {
        if (error) {
            return res.status(404).json({
                message: error.message,
                error
            })
        } else if (decoded && decoded.id) {
            User.findOne({ id: decoded.id }).then(user => {
                res.locals.jwt = decoded;
                next();
            })
        }
    });
}

export default getAuthToken;