import HttpError from "../errors/httpError.js"
import jwt from 'jsonwebtoken'
import createConfig from "../config/config.js"

const userVerification = (req, res, next) => {
    const {secret} = createConfig();

    try{
        const token = req.cookies.access_token
        req.user = undefined

        if(token) {
            const data = jwt.verify(token, secret)
            req.user = {
                id: data.id,
                username: data.username,
                email: data.email, 
                rol: data.rol,
            }
        }

        next()
    } catch(err) {
        next(err)
    }

}

export default userVerification