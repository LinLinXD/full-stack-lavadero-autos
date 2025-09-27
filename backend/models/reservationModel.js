import { model } from "mongoose";
import reservaSchema from "../schemas/reservaSchema.js";

const reservationModel = model("Reservas", reservaSchema)

export default reservationModel
