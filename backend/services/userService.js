import bcrypt from 'bcrypt'
import HttpError from '../errors/httpError.js';
import { generateJwt } from '../utils/jwtUtils.js';
import { sendVerificationEmail } from '../utils/verificationEmailUtils.js';

class UserService {
    constructor (userModel){
        this.userModel = userModel
    }

async registerNonVerifiedUser (userInfo, salt) {
        const {username, password, email} = userInfo;

        const isEmailUsed = await this.userModel.findOne({email});


        if(isEmailUsed){
            throw new HttpError('El email ingresado no está disponible', 400, 'used-email')
        }

        const isUsernameUsed = await this.userModel.findOne({username})

        if(isUsernameUsed){
            throw new HttpError('El username ingresado no está disponible', 400, 'used-username')
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedCode = await bcrypt.hash(code, salt)

        const hashedPassword = await bcrypt.hash(password, salt)

        await sendVerificationEmail(email, code)

        const user = new this.userModel({
            username: username,
            password: hashedPassword,
            email: email,
            verificationCode: hashedCode,
            verificationCodeExpiresAt: new Date(Date.now() + 15 * 60 * 1000)
        })

        await user.save()

        return
    }

    async verifyUser (email, code) {
        const user = await this.userModel.findOne({email});

        if(!user){
            throw new HttpError('Este usuario no existe', 400, 'non-existing-user')
        }

        if (!user.verificationCode || !user.verificationCodeExpiresAt) {
            throw new HttpError('No hay un código activo para este usuario', 400, 'no-active-code');
        }

        if (user.verificationCodeExpiresAt.getTime() < Date.now()) {
            throw new HttpError('El código enviado está vencido', 400, 'expired-code');
        }

        const isValid = bcrypt.compare(code, user.verificationCode)

        if(!isValid){
            throw new HttpError('El codigo es incorrecto', 400, 'invalid-code')
        }

        user.isVerified = true;
        user.verificationCode = undefined;
        user.verificationCodeExpiresAt = undefined;
        await user.save();
    }

    async login (userInfo) {
        const {email, password} = userInfo

        const user = await this.userModel.findOne({email})

        if(!user) {
            throw new HttpError('El email o la contraseña no son validos', 400, 'invalid-data')
        }

        if(!user.isVerified){
            await this.userModel.deleteOne({email})
            throw new HttpError('Este usuario ¡NO! ha sido verificado, vuelva a registrarse con su gmail y recibira un nuevo codigo', 400, 'not-verified')
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword) {
            throw new HttpError('El email o la contraseña no son validos', 400, 'invalid-data')
        }

        const token = generateJwt(user)
        
        return {token, user};
    }

}

export default UserService

