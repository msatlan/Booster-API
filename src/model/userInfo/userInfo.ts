import { Moment } from 'moment';
import { IUserInfo } from './userInfo.interface';

export class UserInfo implements IUserInfo {
    _id: string;
    token: string;
}
