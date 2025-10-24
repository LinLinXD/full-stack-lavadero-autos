import {Schema} from "mongoose";

const servicioSchema = Schema({
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    costo: {type: String, required: true},
    duracion: {type: Number, required: true},
    excluye: {type: [String], default: []}
})

export default servicioSchema