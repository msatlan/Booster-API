import moment from 'moment';
import { model, Schema } from 'mongoose';
import { IRefreshTokenDocument } from './refreshToken.interface';

export const RefreshTokenSchema = new Schema<IRefreshTokenDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'users' },
        token: { type: String, required: [true, 'Field is required'] },
    },
    {
        timestamps: true,
    }
);

// expires in 10800 - 3 hours - automatically deletes entry from db
RefreshTokenSchema.index({ createdAt: 1 }, { expires: 10800 });

const RefreshToken = model<IRefreshTokenDocument>('RefreshToken', RefreshTokenSchema);

export default RefreshToken;
