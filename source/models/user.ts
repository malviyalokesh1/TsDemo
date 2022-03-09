import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/user';
import bcrypt from 'bcryptjs';

export interface IUserModel extends IUser, Document {
    comparePassword(candidatePassword: string, userPassword: string): boolean;
}

/** User model */
const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false}
    },
    {
        timestamps: true
    }
);

/**  Pre save middleware to bcrypt password */
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

/** Instance method to compare password */
UserSchema.methods.comparePassword = async function (
    candidatePassword: string,
    userPassword: string
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

export default mongoose.model<IUserModel>('User', UserSchema);