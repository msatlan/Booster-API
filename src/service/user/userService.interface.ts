import { IUserDocument } from '../../model/user/user.interface';
import { IUserInfo } from '../../model/userInfo/userInfo.interface';
import { IBaseService } from '../common/baseService.interface';

export default interface IUserService extends IBaseService<IUserDocument> {
    registerAsync(user: IUserDocument): Promise<IUserInfo>;
    loginAsync(email: string, password: string): Promise<IUserInfo | null>;
}
