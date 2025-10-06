import { Router } from "express";
import validate from "../middlewares/validate.js";
import UserController from "../controllers/user.controller.js";
import { loginUserSchema, registerUserSchema } from "../validations/usuarioValidation.js";

const userRouter = Router();
const userController = new UserController();

userRouter.post('/register', validate(registerUserSchema), userController.register)
userRouter.post('/login', validate(loginUserSchema), userController.login)
userRouter.get('/logout', userController.logout)

export default userRouter