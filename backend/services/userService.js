import bcrypt from 'bcrypt'
import HttpError from '../errors/httpError.js';
import { generateJwt } from '../utils/jwtUtils.js';

class UserService {
    constructor (userModel){
        this.userModel = userModel
    }

    async register (userInfo, salt) {
        const {username, password, email} = userInfo;

        const isEmailUsed = await this.userModel.findOne({email});


        if(isEmailUsed){
            throw new HttpError('El email ingresado no está disponible', 400, 'used-email')
        }

        const isUsernameUsed = await this.userModel.findOne({username})

        if(isUsernameUsed){
            throw new HttpError('El username ingresado no está disponible', 400, 'used-username')
        }

        const hashedPassword = await bcrypt.hash(password, salt)


        const user = new this.userModel({
            username: username,
            password: hashedPassword,
            email: email
        })

        return await user.save()

    }

    async login (userInfo) {
        const {email, password} = userInfo

        const user = await this.userModel.findOne({email})

        if(!user) {
            throw new HttpError('Email or password is not valid', 400, 'invalid-data')
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword) {
            throw new HttpError('Email or password is not valid', 400, 'invalid-data')
        }

        const token = generateJwt(user)
        
        return {token, user};
    }

}

export default UserService

