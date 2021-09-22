import { Moment } from 'moment';

export interface IUserInfo {
    _id: string;
    name: string;
    email: string;
    token: string;
    tokenExpirationTime: Moment;
}
