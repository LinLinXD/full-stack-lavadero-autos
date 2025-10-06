import { model } from "mongoose";
import servicioSchema from "../schemas/servicioSchema.js";

const serviceModel = model("Servicios", servicioSchema)

export default serviceModel
