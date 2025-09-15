import { model } from "mongoose";
import usuarioSchema from "../schemas/usuarioSchema.js";

const usuarioModel = model("Usuarios", usuarioSchema);

export default usuarioModel;
