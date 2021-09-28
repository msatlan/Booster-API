import { Router, Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { secret } from '../../common/config/jwtSecret';
import { verifyToken } from '../../common/middleware/userAuthorization';
import { IUserInfo } from '../../model/common/userInfo/userInfo.interface';
import UserService from '../../service/user/userService';

class UserController {
    public router = Router();

    constructor(private userService: UserService) {
        this.setRoutes();
    }

    public setRoutes() {
        this.router.route('/refreshToken').post(this.refreshJwtToken);
        this.router.route('/getToken').get(this.getToken);

        this.router.route('/register').post(this.register);
        this.router.route('/login').post(this.login);
        this.router.route('/logout').post(this.logout);

        this.router.route('/find/').get(verifyToken, this.find);
        this.router.route('/all').get(verifyToken, this.findAll);
        this.router
            .route('/:id')
            .get(verifyToken, this.findById)
            .delete(verifyToken, this.delete)
            .put(verifyToken, this.update);
    }

    private refreshJwtToken = async (req: Request, res: Response) => {
        try {
            let refreshToken = req.body.refreshToken;
            let userId = req.body.userId;
            let userInfo = await this.userService.refereshJwtTokenAsync(refreshToken, userId);
            res.status(200).send(userInfo);
        } catch (error: any) {
            console.log(error);
        }
    };

    // testing purposes
    private getToken = async (req: Request, res: Response) => {
        try {
            console.log('token');
            let token = jwt.sign(
                {
                    id: 'asdasd',
                },
                secret.secret,
                // expires in 2 hours
                { expiresIn: 60 * 60 * 2 }
            );
            res.status(200).send({ token });
        } catch (error: any) {
            console.log(error);
        }
    };

    private findById = async (req: Request, res: Response) => {
        try {
            const result = await this.userService.findByIdAsync(req.params.id);
            res.send(result);
        } catch (ex: any) {
            res.send(ex.message);
        }
    };

    private findAll = async (req: Request, res: Response) => {
        try {
            const result = await this.userService.getAllAsync();

            res.send(result);
        } catch (ex) {
            res.send(ex);
        }
    };

    private find = async (req: Request, res: Response) => {
        try {
            const result = await this.userService.findAsync(req.query);
            res.send(result);
        } catch (ex) {
            res.send(ex);
        }
    };

    private delete = async (req: Request, res: Response) => {
        try {
            await this.userService.deleteAsync(req.params.id);
            res.send('Delete successfull');
        } catch (ex: any) {
            res.status(404).send(ex.message);
        }
    };

    private update = async (req: Request, res: Response) => {
        try {
            await this.userService.updateAsync(req.params.id, req.body);

            res.send('Update successfull');
        } catch (ex: any) {
            res.status(404).send(ex.message);
        }
    };

    private register = async (req: Request, res: Response) => {
        try {
            let userInfo = await this.userService.registerAsync(req.body);
            this.handleSession(req, userInfo);
            res.status(201).send(userInfo);
        } catch (ex: any) {
            res.status(400).send(ex.message);
        }
    };

    private login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            let userInfo = await this.userService.loginAsync(email, password);
            this.handleSession(req, userInfo);
            res.status(200).json(userInfo);
        } catch (ex: any) {
            console.log(ex);
            res.status(500).send(ex.message);
        }
    };

    private logout = async (req: Request, res: Response) => {
        try {
            let result = await this.userService.logoutAsync(req.body.userId);
            if (result) {
                if (req.session) {
                    req.session.destroy((err) => {
                        if (err) {
                            //log error
                        }
                        console.log('session destroyed');
                        res.status(200).send('Logout successfull');
                    });
                } else {
                    //log error
                }
            } else {
                res.status(500).send('Failed to log out');
            }
        } catch (ex: any) {
            console.log(ex);
            res.status(500).send(ex.message);
        }
    };

    private handleSession(req: Request, userInfo: IUserInfo): void {
        // regenerate session after user has logged in or registered as a security measure
        req.session.regenerate((err) => {
            if (err) {
                // log errors
            }
        });
        req.session.userInfo = { ...userInfo };
    }
}

export default UserController;
