import { model } from "mongoose";
import reservaSchema from "../schemas/reservaSchema.js";

const reservaModel = model("Reservas", reservaSchema)

export default reservaModel
