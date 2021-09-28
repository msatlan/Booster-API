import { dbConnection } from './common/config/dbConfig';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
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
        this.app.use(express.json());
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
                store: MongoStore.create({
                    mongoUrl: 'mongodb://localhost:27017/boosterDb',
                    ttl: 2 * 60 * 60, // session persists in db for 2 hours
                }),
            })
        );
    }

    private setControllers() {
        const userController = new UserController(new UserService());
        this.app.use('/user', userController.router);
    }
}

export default new App().app;
