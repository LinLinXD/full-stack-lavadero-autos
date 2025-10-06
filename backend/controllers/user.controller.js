import UserService from "../services/userService.js"
import userModel from "../models/userModel.js"
import createConfig from "../config/config.js"
import HttpError from "../errors/httpError.js"

const { salt } = createConfig()

const userService = new UserService(userModel)

class UserController {
    constructor() {

    }

    async register (req, res, next) {
        try{
            const userInfo = req.body;
            const user = await userService.register(userInfo, salt);

            return res.status(201).json({success: true, payload: {user}});
        } catch (err) {
            return next(err)
        }
    }

    async login (req, res, next) {
        try{
            const userInfo = req.body;
            const {token, user} = await userService.login(userInfo)

            return res
                .cookie('access_token', token, {
                    httpOnly: true,
                    sameSite: 'lax',
                    secure: true,
                    maxAge: 1000 * 60 * 60
                })
                .status(200)
                .json({
                    id: user.id,
                    username: user.username,
                    email: user.email
                })


        } catch (err) {
            next(err)
        }

    }

    async logout (req, res, next) {
        res.clearCookie('access_token', {httpOnly: true, sameSite: 'lax'});
        return res.json({message: 'Logged Out'})
    }
}

export default UserController

