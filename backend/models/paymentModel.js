import { model } from "mongoose";
import pagoSchema from "../schemas/pagoSchema.js";

const paymentModel = model("Pagos", pagoSchema)

export default paymentModel
