import bcrypt from 'bcrypt';

export const hashPasswordAsync = async (password: string): Promise<string> => {
    try {
        return await bcrypt.hash(password, 16.5);
    } catch (ex: any) {
        throw ex;
    }
};

export const validatePasswordAsync = async (password: string, hashed: string): Promise<boolean> => {
    try {
        return await bcrypt.compare(password, hashed);
    } catch (ex: any) {
        throw ex;
    }
};
