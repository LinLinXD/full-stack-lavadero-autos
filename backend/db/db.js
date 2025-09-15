import mongoose from "mongoose"

const connect = async (url) => {
    try {
        await mongoose.connect(url)
        mongoose.set('toJSON', {
            transform: (_, ret) => {
                ret.id = ret._id
                delete ret.__v
                delete ret._id

                return ret
            }
        })
    } catch (error) {
        console.error('Un error inesperado ocurrio mientras se intentaba conectar a la db')
    }
} 

const disconnect = async (url) => {
    mongoose.connection.removeAllListeners();
    return mongoose.disconnect();
}


export {
    connect,
    disconnect
}