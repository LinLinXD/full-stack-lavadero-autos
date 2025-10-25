import jwt from 'jsonwebtoken'
import createConfig from '../config/config.js';

export const generateJwt = (user) =>  {
    const {id, username, email, rol} = user;
    const { secret } = createConfig()

    const token = jwt.sign(
        {
            id: id,
            username: username,
            email: email,
            rol: rol
        },
        secret, 
        {expiresIn: '1h'}        
    )

    return token
}