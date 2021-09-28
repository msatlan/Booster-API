import { IRefreshTokenDocument } from '../../model/common/refreshToken/refreshToken.interface';
import IBaseRepository from '../common/baseRepository.interface';

export interface IRefreshTokenRepository extends IBaseRepository<IRefreshTokenDocument> {
    createTokenWithUserIdAsync(userId: string): Promise<string>;
    findByUserIdAndDelete(userId: string): Promise<boolean>;
    getNewRefreshTokenAsync(token: string): Promise<string | null>;
}
