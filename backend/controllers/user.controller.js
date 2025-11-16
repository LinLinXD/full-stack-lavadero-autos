import UserService from "../services/userService.js"
import userModel from "../models/userModel.js"
import createConfig from "../config/config.js"
import HttpError from "../errors/httpError.js"

const { salt } = createConfig()

const userService = new UserService(userModel)

class UserController {
    constructor() {

    }

    async me (req, res, next) {
        try{ 
            const user = req.user;

            if (user) return res.json({success: true, message: 'El usuario esta logueado', user: user});
        
            throw new HttpError('No hay usuario logueado', 401, 'no-account')
        } catch (err) {
            return next(err)
        }
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
                    success: true,
                    message: "El usuario fue creado exitosamente",
                    payload: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        rol: user.rol
                    }
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

