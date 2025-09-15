import {Schema} from "mongoose";

const servicioSchema = Schema({
    nombre: {type: String, required: true},
    costo: {type: Number, required: true},
    duracion: {type: Number, required: true},
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {type: Date}
})

export default servicioSchema