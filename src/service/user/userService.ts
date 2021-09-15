import User from '../../model/user/user';
import { IUserDocument } from '../../model/user/user.interface';
import { IUserInfo } from '../../model/userInfo/userInfo.interface';
import BaseService from '../common/baseService';
import IUserService from './userService.interface';
import * as jwt from 'jsonwebtoken';
import { secret } from '../../common/config/jwtSecret';
import { UserInfo } from '../../model/userInfo/userInfo';
import { validatePasswordAsync } from '../../common/utils/userValidation';
import UserRepository from '../../repository/user/userRepository';
import { FilterQuery } from 'mongoose';

class UserService extends BaseService implements IUserService {
    private repository: UserRepository;

    constructor() {
        super();
        this.repository = new UserRepository();
    }

    async registerAsync(user: IUserDocument): Promise<IUserInfo> {
        const userToAdd = new User(user);
        let newUser = await this.repository.registerAsync(userToAdd);

        if (!newUser) {
            throw new Error('Failed to create user');
        }

        let token = jwt.sign(
            {
                id: newUser._id.toString(),
            },
            secret.secret,
            { expiresIn: 60 * 60 * 2 }
        );

        const userInfo = new UserInfo();
        userInfo._id = newUser._id.toString();
        userInfo.name = newUser.name;
        userInfo.email = newUser.email;
        userInfo.token = token;

        return userInfo;
    }

    async loginAsync(email: string, password: string): Promise<IUserInfo> {
        try {
            const user = await this.repository.findOneAsync(email);

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

    public async findByIdAsync(id: string): Promise<IUserDocument | null> {
        let result = await this.repository.getByIdAsync(id);

        if (!result) {
            throw new Error('Failed to fetch user');
        }

        return result;
    }

    public async getAllAsync(): Promise<IUserDocument[] | null> {
        let result = await this.repository.getAllAsync();

        if (!result) {
            throw new Error('Failed to fetch users');
        }

        return result;
    }

    public async findAsync(filter: FilterQuery<IUserDocument>): Promise<IUserDocument[] | null> {
        let result = await this.repository.findAsync(filter);

        if (!result) {
            throw new Error('Failed to fetch users');
        }

        return result;
    }

    public async deleteAsync(id: string): Promise<boolean> {
        let result = await this.repository.deleteAsync(id);

        if (!result) {
            throw new Error('Failed to delete user');
        }

        return result;
    }

    public async updateAsync(
        id: string,
        user: IUserDocument | Partial<IUserDocument>
    ): Promise<boolean> {
        let result = await this.repository.updateAsync(id, user);

        if (!result) {
            throw new Error('Failed to update user');
        }

        return result;
    }
}

export default UserService;
