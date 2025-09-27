import { Router } from "express";
import { register } from "../controllers/user.controller.js";
import validate from "../middlewares/validate.js";
import { registerUserSchema } from "../validations/usuarioValidation.js";

const userRouter = Router();


userRouter.post('/register', validate(registerUserSchema) ,register)

export default userRouter