import {Schema} from "mongoose";

const reservaSchema = Schema({
    id_servicio: {
        type: Schema.Types.ObjectId,
        ref: "Servicios",
        required: true
    },
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuarios"
    },
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