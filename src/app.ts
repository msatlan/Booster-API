import { dbConnection } from './common/config/dbConfig';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import { responseHeaderConfig } from './common/config/responseHeaderConfig';
import UserController from './controller/user/userController';
import UserService from './service/user/userService';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        dbConnection();
        this.initMiddleware();
        this.setControllers();
    }

    private initMiddleware() {
        responseHeaderConfig(this.app);
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(cors());
        this.app.use(
            session({
                secret: 'secret123',
                resave: false,
                saveUninitialized: true,
                cookie: {
                    secure: true,
                    httpOnly: true,
                    //limit cookie duration
                    //maxAge: 1*60*60*1000
                },
                name: 'id',
            })
        );
    }

    private setControllers() {
        const userController = new UserController(new UserService());
        this.app.use('/user', userController.router);
    }
}

export default new App().app;
