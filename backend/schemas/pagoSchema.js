import {Schema} from "mongoose";

const pagoSchema = Schema({
    id_usuario: {type: String, required: true},
    metodo_pago: {type: String, required: true},
    total: {type: Number, required: true},
    fecha: {type: Date, default: Date.now}
})

export default pagoSchema