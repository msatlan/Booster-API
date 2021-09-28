import { model, Schema } from 'mongoose';
import { hashPasswordAsync } from '../../../common/utils/userValidation';
import { IUserDocument } from './user.interface';

export const UserSchema = new Schema<IUserDocument>(
    {
        name: { type: String, required: [true, 'Field is required'] },
        email: { type: String, required: [true, 'Field is required'] },
        password: { type: String, required: [true, 'Field is required'] },
        phone: { type: Number, required: [true, 'Field is required'] },
        image: { type: String, required: [true, 'Field is required'] },
    },
    {
        timestamps: true,
    }
);

// save encrypted user password to database
UserSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    try {
        let hash = await hashPasswordAsync(user.password);
        user.password = hash;
        next();
    } catch (error: any) {
        next(error);
        return;
    }
});

const User = model<IUserDocument>('User', UserSchema);

export default User;
