import Joi from 'joi'


export const registerUserSchema = {
    body: Joi.object().keys({
        username: Joi.string().min(4).max(15),
        password: Joi.string().min(6),
        email: Joi.string().email(),
    }).unknown(false)
}

export const loginUserSchema = {
    body: Joi.object().keys({
        email: Joi.string(),
        password: Joi.string(),
    }).unknown(false)
}



