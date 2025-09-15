import Joi from 'joi'

const createConfig = () => {

    const envVarsSchema = Joi.object().keys({
        PORT: Joi.number().default(3000).description('Puerto del servidor'),
        SECRET: Joi.string().description('Secret del jwt'),
        MONGODB_URL: Joi.string()
    }).unknown();

    const {value: envVars, error} = envVarsSchema
        .prefs({errors: {label: 'key'}})
        .validate(process.env)

    if (error) {
        throw new Error('Enviroment Variables could not be read --> ' + error)
    }

    return {
        port: envVars.PORT,
        secret: envVars.SECRET,
        mongodb_url: envVars.MONGODB_URL
    }

}

export default createConfig; 


