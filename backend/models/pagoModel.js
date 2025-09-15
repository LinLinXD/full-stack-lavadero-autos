import { model } from "mongoose";
import pagoSchema from "../schemas/pagoSchema.js";

const pagoModel = model("Pagos", pagoSchema)

export default pagoModel
