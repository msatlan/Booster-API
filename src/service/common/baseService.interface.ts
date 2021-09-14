import { Document, FilterQuery } from 'mongoose';

export interface IBaseService<T extends Document> {
    getAllAsync(): Promise<T[] | null>;
    findByIdAsync(id: string): Promise<T | null>;
    findAsync(filter: FilterQuery<T>): Promise<T[] | null>;
    deleteAsync(id: string): Promise<boolean>;
    updateAsync(id: string, model: T | Partial<T>): Promise<boolean>;
}
