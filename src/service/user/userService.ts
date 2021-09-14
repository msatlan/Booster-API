import User from '../../model/user/user';
import { IUserDocument } from '../../model/user/user.interface';
import { IUserInfo } from '../../model/userInfo/userInfo.interface';
import BaseService from '../common/baseService';
import IUserService from './userService.interface';
import * as jwt from 'jsonwebtoken';
import { secret } from '../../common/config/jwtSecret';
import { UserInfo } from '../../model/userInfo/userInfo';
import { validatePasswordAsync } from '../../common/utils/userValidation';

class UserService extends BaseService implements IUserService {
    private repository: UserRepository;

    constructor() {
        super();
        this.repository = new UserRepository();
    }

    async registerAsync(user: IUserDocument): Promise<IUserInfo> {
        const newUser = new User(user);
        let result = await this.repository.createAsync(newUser);

        if (!result) {
            throw new Error('Failed to create user');
        }

        let token = jwt.sign(
            {
                id: newUser._id,
            },
            secret.secret,
            { expiresIn: 60 * 60 * 2 }
        );

        const userInfo = new UserInfo();
        userInfo._id = user._id;
        userInfo.name = user.name;
        userInfo.email = user.email;
        userInfo.token = token;

        return userInfo;
    }

    async loginAsync(email: string, password: string): Promise<IUserInfo> {
        try {
            const user = await this.repository.findOne(email);

            if (!user) {
                throw new Error('User not found!');
            }

            if (await validatePasswordAsync(password, user.password)) {
                let token = jwt.sign(
                    {
                        id: user._id,
                    },
                    secret.secret,
                    { expiresIn: 60 * 60 * 2 }
                );

                const userInfo = new UserInfo();
                userInfo._id = user._id;
                userInfo.name = user.name;
                userInfo.email = user.email;
                userInfo.token = token;

                return userInfo;
            } else {
                throw new Error('Invalid username or password');
            }
        } catch (ex) {
            console.log(ex);
            throw new Error('There was an error attempting to login. Please try again later.');
        }
    }

    async getAllAsync(): Promise<IUserDocument[] | null> {
        throw new Error('Method not implemented.');
    }

    async findByIdAsync(id: string): Promise<IUserDocument | null> {
        throw new Error('Method not implemented.');
    }

    async findAsync(filter: any): Promise<IUserDocument[] | null> {
        throw new Error('Method not implemented.');
    }

    async deleteAsync(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    async updateAsync(id: string, model: IUserDocument | Partial<IUserDocument>): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}

export default UserService;
