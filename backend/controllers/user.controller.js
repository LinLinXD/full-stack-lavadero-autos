import UserService from "../services/userService.js"
import userModel from "../models/userModel.js"
import createConfig from "../config/config.js"

const { salt } = createConfig()

const userService = new UserService(userModel)

export const register = async (req, res, next) => {
    try{
        const userInfo = req.body
        const user = await userService.register(userInfo, salt)

        return res.status(201).json({success: true, payload: {user}})
    } catch (err) {
        return next(err)
    }
}


