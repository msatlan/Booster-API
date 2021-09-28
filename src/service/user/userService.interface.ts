import { IUserDocument } from '../../model/common/user/user.interface';
import { IUserInfo } from '../../model/common/userInfo/userInfo.interface';
import { IBaseService } from '../common/baseService.interface';

export default interface IUserService extends IBaseService<IUserDocument> {
    registerAsync(user: IUserDocument): Promise<IUserInfo>;
    loginAsync(email: string, password: string): Promise<IUserInfo | null>;
    logoutAsync(userId: string): Promise<boolean>;
    refereshJwtTokenAsync(refreshToken: string, userId: string): Promise<IUserInfo | null>;
}
