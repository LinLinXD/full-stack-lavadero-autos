import { Router } from "express";
import validate from "../middlewares/validate.js";
import UserController from "../controllers/user.controller.js";
import { loginUserSchema, registerUserSchema } from "../validations/usuarioValidation.js";
import userVerification from "../middlewares/userVerification.js";

const userRouter = Router();
const userController = new UserController();

userRouter.post('/register', validate(registerUserSchema), userController.register)
userRouter.post('/login', validate(loginUserSchema), userController.login)
userRouter.get('/logout', userController.logout)
userRouter.get('/me', userVerification, userController.me)

export default userRouter