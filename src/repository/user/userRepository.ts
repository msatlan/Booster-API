import { FilterQuery } from 'mongoose';
import User from '../../model/user/user';
import { IUserDocument } from '../../model/user/user.interface';
import { IUserRepository } from './userRepository.interface';

class UserRepository implements IUserRepository {
    // TODO: implement this method if admin has the possibility to create new users
    async createAsync(newModel: IUserDocument): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    async getByIdAsync(id: string): Promise<IUserDocument | null> {
        try {
            let result = await User.findById(id);
            if (!result) {
                return null;
            }

            return result;
        } catch (ex: any) {
            // log error
            return null;
        }
    }

    async getAllAsync(): Promise<IUserDocument[] | null> {
        try {
            let result = await User.find({});

            if (!result) {
                return null;
            }
            return result;
        } catch (ex: any) {
            // log error
            return null;
        }
    }

    async findAsync(filter: FilterQuery<IUserDocument>): Promise<IUserDocument[] | null> {
        try {
            let result = await User.find(filter);

            if (!result) {
                return null;
            }
            return result;
        } catch (ex: any) {
            // log error
            return null;
        }
    }

    async registerAsync(newUser: IUserDocument): Promise<IUserDocument | null> {
        try {
            let result = await newUser.save();

            if (!result) {
                return null;
            }
            return result;
        } catch (ex: any) {
            // log error
            return null;
        }
    }

    async updateAsync(id: string, user: IUserDocument | Partial<IUserDocument>): Promise<boolean> {
        try {
            const result: IUserDocument | null = await User.findByIdAndUpdate(id, user);

            if (!result) {
                return false;
            }
            return true;
        } catch (ex: any) {
            // log error
            return false;
        }
    }

    async deleteAsync(id: string): Promise<boolean> {
        try {
            const result = await User.findByIdAndDelete(id);

            if (!result) {
                return false;
            }
            return true;
        } catch (ex: any) {
            // log error
            return false;
        }
    }

    async findOneAsync(email: string): Promise<IUserDocument | null> {
        try {
            const result = await User.findOne({ email: email });

            if (!result) {
                return null;
            }
            return result;
        } catch (ex: any) {
            // log error
            return null;
        }
    }
}

export default UserRepository;
