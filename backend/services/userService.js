import bcrypt from 'bcrypt'
import HttpError from '../errors/httpError.js';


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


}

export default UserService