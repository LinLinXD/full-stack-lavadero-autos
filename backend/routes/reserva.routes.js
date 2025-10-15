import { Router } from "express";
import ReservationController from "../controllers/reserva.controller.js";
import authVerification from "../middlewares/authVerification.js";

const reservationRouter = Router();
const reservationController = new ReservationController();

reservationRouter.post('/create', authVerification, reservationController.createReservation)
reservationRouter.get('/my-reservations', authVerification, reservationController.getAllUserReservations)
reservationRouter.post('/filter-reservations', reservationController.filterReservations)

export default reservationRouter