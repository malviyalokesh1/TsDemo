import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "../config/config";

/** Sign token */
const signToken = async (id: mongoose.Types.ObjectId) => {
    return jwt.sign({ id: id }, config.token.secret, {
        expiresIn: config.token.expires_in
    });
};

export default signToken;