import Joi from "joi";

export const filterScheme = {
    body: Joi.object().keys({
        placa: Joi.string(), 
        estado: Joi.string(), 
        inicio: Joi.date(), 
        fin: Joi.date(), 
        username: Joi.string(), 
        servicio: Joi.string()
    })
}