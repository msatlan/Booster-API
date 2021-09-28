import { IUserDocument } from '../../model/common/user/user.interface';
import IBaseRepository from '../common/baseRepository.interface';

export interface IUserRepository extends IBaseRepository<IUserDocument> {
    findOneAsync(email: string): Promise<IUserDocument | null>;
    registerAsync(newUser: IUserDocument): Promise<IUserDocument | null>;
}
