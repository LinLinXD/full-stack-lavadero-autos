import { model } from "mongoose";
import servicioSchema from "../schemas/servicioSchema.js";

const servicioModel = model("Reservas", servicioSchema)

export default servicioModel
