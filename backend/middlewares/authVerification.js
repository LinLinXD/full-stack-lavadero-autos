import HttpError from "../errors/httpError.js"
import jwt from 'jsonwebtoken'
import createConfig from "../config/config.js"

const authVerification = (req, res, next) => {
    const {secret} = createConfig();

    try{
        const token = req.cookies.access_token
        req.user = { userInfo: null }

        if(!token) {
            throw new HttpError('Tiene permisos insuficientes', 401)
        }

        try{
            const data = jwt.verify(token, secret)
            req.user = {
                id: data.id,
                username: data.username,
                email: data.email
            }
        } catch (err) {
            throw new HttpError('Token invalido o expirado', 401)
        }

 
        next()
    } catch(err) {
        next(err)
    }

}

export default authVerification