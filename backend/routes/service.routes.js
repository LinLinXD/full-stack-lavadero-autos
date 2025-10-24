import { Router } from "express";
import ServiceController from "../controllers/service.controller.js";

const serviceRouter = Router();
const serviceController = new ServiceController();

serviceRouter.get('/', serviceController.getAllServices)

export default serviceRouter