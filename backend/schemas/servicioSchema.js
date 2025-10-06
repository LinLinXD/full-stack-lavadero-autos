import {Schema} from "mongoose";

const servicioSchema = Schema({
    nombre: {type: String, required: true},
    costo: {type: Number, required: true},
    duracion: {type: Number, required: true},
    excluye: {type: [String], default: []}
})

export default servicioSchema