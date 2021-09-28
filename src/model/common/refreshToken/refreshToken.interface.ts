import { Document, PopulatedDoc } from 'mongoose';
import { IUserDocument } from '../user/user.interface';

export interface IRefreshTokenDocument extends Document {
    userId: PopulatedDoc<IUserDocument & Document>;
    token: string;
    createdAt: Date;
}
