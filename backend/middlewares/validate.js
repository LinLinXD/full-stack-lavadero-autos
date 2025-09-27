import Joi from 'joi'
import HttpError from '../errors/httpError.js';

const take = (object, keys) => {
    return Object.assign({}, ...keys
            .filter(key => object.hasOwnProperty(key))
            .map(key => ({ [key]: object[key]
        }))
    )
}


const validate = (schema) => (req, res, next) => {
    try{
        const selectedSchema = take(schema, ['body', 'params', 'query']);

        const objectToValidate = take(req, Object.keys(selectedSchema));


        const {value, error} = Joi.compile(selectedSchema).prefs({errors: {label: 'key'}, abortEarly: false}).validate(objectToValidate);

        if(error){
            const errorMsg = error.details.map(d => d.message).join(',')

            return next(new HttpError(errorMsg, 400))
        }

        Object.assign(req, value)
        next();
    } catch (err) {
        throw new HttpError('Unexpected error', 500)
    }
}

export default validate