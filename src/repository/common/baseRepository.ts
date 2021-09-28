import path from 'path';
import { Logger } from '../../common/utils/logger';

// used for common implementation for all repository classes
class BaseRepository {
    protected logger;

    constructor() {
        const repositoryLogger = new Logger(path.basename(__filename), './logs/repository');
        this.logger = repositoryLogger.getLogger();
    }
}

export default BaseRepository;
