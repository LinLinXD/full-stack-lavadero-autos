import { model } from "mongoose";
import usuarioSchema from "../schemas/usuarioSchema.js";

const userModel = model("Usuarios", usuarioSchema);

export default userModel;
