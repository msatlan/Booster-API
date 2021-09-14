import { Document, FilterQuery } from 'mongoose';

export interface IBaseRepository<T extends Document> {
    getByIdAsync(id: string): Promise<T | null>;

    getAllAsync(): Promise<T[] | null>;

    findAsync(filter: FilterQuery<T>, options: {}): Promise<T[] | null>;

    createAsync(newModel: T): Promise<boolean>;

    updateAsync(id: string, modelForUpdate: T): Promise<boolean>;

    deleteAsync(id: string): Promise<boolean>;
}
