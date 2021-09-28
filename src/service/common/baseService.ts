import path from 'path';
import { Logger } from '../../common/utils/logger';

class BaseService {
    protected logger;

    constructor() {
        const serviceLogger = new Logger(path.basename(__filename), './logs/service');
        this.logger = serviceLogger.getLogger();
    }
}

export default BaseService;
