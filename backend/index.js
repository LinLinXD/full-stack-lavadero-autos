import app from "./app.js";
import createConfig from "./config/config.js";
import {connect, disconnect} from './db/db.js'


const {port, mongodb_url} = createConfig()

const execute = async () => {
    const server = app.listen(port, () => {
        console.log('App running in port ' + port)
    })

    await connect(mongodb_url)

    const closeServer = () => {
        if(server){
            disconnect()
            server.close(() => {
                console.error("server closed")
                process.exit(1)
            })

        }
        process.exit(1) 
    }

    const unexpectedError = (error) => {
        console.error('There was an unexpected error ' + error)
        closeServer
    }

    process.on('uncaughtException', unexpectedError)
    process.on('unhandledRejection', unexpectedError)

}

execute() 