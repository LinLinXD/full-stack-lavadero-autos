import {Schema} from "mongoose";

const reservaSchema = Schema({
    id_servicio: [{
        type: Schema.Types.ObjectId,
        ref: "Servicios",
        required: true
    }],
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuarios"
    },
    placa: {
        type: String, 
        required: true
    },
    estado: {
        type: String,
        enum: ["activo", "en curso", "completado", "cancelado"]
    },
    fecha: {
        type: Date,
        required: true
    },
})

export default reservaSchema