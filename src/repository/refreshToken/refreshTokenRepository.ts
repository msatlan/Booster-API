import RefreshToken from '../../model/common/refreshToken/refreshToken';
import { IRefreshTokenDocument } from '../../model/common/refreshToken/refreshToken.interface';
import crypto from 'crypto';
import { IRefreshTokenRepository } from './refreshTokenRepository.interface';

class RefreshTokenRepository implements IRefreshTokenRepository {
    async getNewRefreshTokenAsync(token: string): Promise<string | null> {
        try {
            let result = await RefreshToken.findOne({ token: token });
            if (result) {
                let userId = result.userId;
                try {
                    await RefreshToken.findByIdAndDelete(result._id);
                    let newRefreshToken = await this.createTokenWithUserIdAsync(userId);
                    return newRefreshToken;
                } catch (ex: any) {
                    // log error
                    return null;
                }
            }
            return null;
        } catch (ex: any) {
            // log error
            return null;
        }
    }

    async findByUserIdAndDelete(userId: string): Promise<boolean> {
        try {
            let result = await RefreshToken.findOne({ userId: userId });
            if (result) {
                try {
                    await RefreshToken.findByIdAndDelete(result._id);
                    return true;
                } catch (ex: any) {
                    // log error
                    return false;
                }
            }
            return false;
        } catch (ex: any) {
            // log error
            return false;
        }
    }

    async createTokenWithUserIdAsync(userId: string): Promise<string> {
        try {
            let refreshToken: IRefreshTokenDocument = new RefreshToken();
            refreshToken.token = crypto.randomBytes(40).toString('hex');
            refreshToken.userId = userId;
            await refreshToken.save();
            return refreshToken.token;
        } catch (error) {
            console.log(error);
            return '';
        }
    }

    async getByIdAsync(id: string): Promise<IRefreshTokenDocument | null> {
        try {
            let result = await RefreshToken.findById(id);
            if (!result) {
                return null;
            }

            return result;
        } catch (ex: any) {
            // log error
            return null;
        }
    }

    async getAllAsync(): Promise<IRefreshTokenDocument[] | null> {
        throw new Error('Method not implemented.');
    }
    async findAsync(filter: any, options: {}): Promise<IRefreshTokenDocument[] | null> {
        throw new Error('Method not implemented.');
    }
    async createAsync(newModel: IRefreshTokenDocument): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    async updateAsync(id: string, modelForUpdate: IRefreshTokenDocument): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    async deleteAsync(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}

export default RefreshTokenRepository;
