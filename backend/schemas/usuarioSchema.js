import {Schema} from "mongoose";

const usuarioSchema = Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    rol: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
})

export default usuarioSchema