import User from '../../model/common/user/user';
import { IUserDocument } from '../../model/common/user/user.interface';
import { IUserInfo } from '../../model/common/userInfo/userInfo.interface';
import BaseService from '../common/baseService';
import IUserService from './userService.interface';
import * as jwt from 'jsonwebtoken';
import { secret } from '../../common/config/jwtSecret';
import { UserInfo } from '../../model/common/userInfo/userInfo';
import { validatePasswordAsync } from '../../common/utils/userValidation';
import UserRepository from '../../repository/user/userRepository';
import { FilterQuery } from 'mongoose';
import { IRefreshTokenRepository } from '../../repository/refreshToken/refreshTokenRepository.interface';
import { IUserRepository } from '../../repository/user/userRepository.interface';
import RefreshTokenRepository from '../../repository/refreshToken/refreshTokenRepository';
import { IRefreshTokenDocument } from '../../model/common/refreshToken/refreshToken.interface';

class UserService extends BaseService implements IUserService {
    private repository: IUserRepository;
    private refreshTokenRepository: IRefreshTokenRepository;

    constructor() {
        super();
        this.repository = new UserRepository();
        this.refreshTokenRepository = new RefreshTokenRepository();
    }
    async refereshJwtTokenAsync(refreshToken: string, userId: string): Promise<IUserInfo | null> {
        let newRefreshToken = await this.refreshTokenRepository.getNewRefreshTokenAsync(
            refreshToken
        );

        if (newRefreshToken) {
            let jwtToken = this.generateJwtToken(userId);

            const userInfo = new UserInfo();
            userInfo._id = userId;
            userInfo.token = jwtToken;
            userInfo.refreshToken = refreshToken;

            return userInfo;
        } else {
            throw new Error('Unable to create new refresh token');
        }
    }

    async registerAsync(user: IUserDocument): Promise<IUserInfo> {
        const userToAdd = new User(user);
        let newUser = await this.repository.registerAsync(userToAdd);

        if (!newUser) {
            throw new Error('Failed to create news user');
        }

        return this.generateTokensAsync(newUser._id);
    }

    async loginAsync(email: string, password: string): Promise<IUserInfo> {
        try {
            const user = await this.repository.findOneAsync(email);

            if (!user) {
                throw new Error('Invalid email or password');
            }

            if (await validatePasswordAsync(password, user.password)) {
                return this.generateTokensAsync(user._id);
            } else {
                throw new Error('Invalid email or password');
            }
        } catch (ex: any) {
            console.log(ex);
            throw new Error(ex.message);
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
        let result = await this.repository.findAsync(filter, {});

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

    public async updateAsync(id: string, user: IUserDocument): Promise<boolean> {
        let result = await this.repository.updateAsync(id, user);

        if (!result) {
            throw new Error('Failed to update user');
        }

        return result;
    }

    private async generateTokensAsync(userId: string): Promise<IUserInfo> {
        let token = this.generateJwtToken(userId);

        let refreshToken: string = await this.refreshTokenRepository.createTokenWithUserIdAsync(
            userId.toString()
        );

        const userInfo = new UserInfo();
        userInfo._id = userId.toString();
        userInfo.token = token;
        userInfo.refreshToken = refreshToken;

        return userInfo;
    }

    async logoutAsync(userId: string): Promise<boolean> {
        // delete refresh token with user's id
        let result = await this.refreshTokenRepository.findByUserIdAndDelete(userId);
        return result;
    }

    private generateJwtToken(userId: string): string {
        let token = jwt.sign(
            {
                id: userId,
            },
            secret.secret,
            { expiresIn: 180 } // secs
        );

        return token;
    }
}

export default UserService;
