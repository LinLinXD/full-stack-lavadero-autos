import { model } from "mongoose";
import servicioSchema from "../schemas/servicioSchema.js";

const serviceModel = model("Reservas", servicioSchema)

export default serviceModel
