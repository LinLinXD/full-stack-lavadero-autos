import bcrypt from 'bcrypt'
import HttpError from '../errors/httpError.js';
import { generateJwt } from '../utils/jwtUtils.js';

class UserService {
    constructor (userModel){
        this.userModel = userModel
    }

    async register (userInfo, salt) {
        try {
            const {username, password, email} = userInfo;
            const hashedPassword = await bcrypt.hash(password, salt)


            const user = new this.userModel({
                username: username,
                password: hashedPassword,
                email: email
            })

            return await user.save()
        } catch (err) {
            throw new HttpError("Something went wrong while creating the user " + err , 500)
        }
    }

    async login (userInfo) {
        const {email, password} = userInfo

        const user = await this.userModel.findOne({email})

        if(!user) {
            throw new HttpError('Email or password is not valid')
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if(!isValidPassword) {
            throw new HttpError('Email or password is not valid')
        }

        const token = generateJwt(user)
        
        return {token, user};
    }

}

export default UserService

