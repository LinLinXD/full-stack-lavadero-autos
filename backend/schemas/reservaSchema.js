import {Schema} from "mongoose";

const reservaSchema = Schema({
    id_servicio: {type: String, required: true, unique: true},
    id_usuario: {type: String, required: true},
    id_vehiculo: {type: String, required: true},
    estado: {
        type: String,
        enum: ["activo", "completado", "cancelado"]
    },
    fecha_reservacion: {
        type: Date,
        default:Date.now
    },
    fecha_finalizado: {
        type: Date
    } 
})

export default reservaSchema