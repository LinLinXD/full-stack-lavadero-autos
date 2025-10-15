import express from 'express'
import cors from 'cors'
import errorHandler from './middlewares/errorHandler.js';
import userRouter from './routes/user.routes.js';
import reservationRouter from './routes/reserva.routes.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))
app.use(cookieParser())

app.use('/auth', userRouter)
app.use('/reservation', reservationRouter)

app.use(errorHandler)

export default app