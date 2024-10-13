import { Schema, model, Document } from 'mongoose';

/**
 * Interface representing a User document in MongoDB.
 */
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'user' | 'visitor';
}

const UserSchema = new Schema<IUser>(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ['admin', 'user', 'visitor'],
            default: 'visitor',
        },
    },
    { timestamps: true }
);

export default model<IUser>('User', UserSchema);
