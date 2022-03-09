import { Document } from 'mongoose';

/** User model interface */
export default interface IUser extends Document {
    name: string,
    email: string,
    password: string
}