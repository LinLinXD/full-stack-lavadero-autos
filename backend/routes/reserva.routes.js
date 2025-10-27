import { Router } from "express";
import ReservationController from "../controllers/reserva.controller.js";
import authVerification from "../middlewares/authVerification.js";
import validate from '../middlewares/validate.js'
import { filterScheme } from "../validations/reserveValidation.js";

const reservationRouter = Router();
const reservationController = new ReservationController();

reservationRouter.post('/create', authVerification, reservationController.createReservation)
reservationRouter.get('/my-reservations', authVerification, reservationController.getAllUserReservations)
reservationRouter.post('/filter-reservations', authVerification, validate(filterScheme), reservationController.filterReservations)
reservationRouter.patch('/cancel-reservation/:id', authVerification, reservationController.cancelReservation)

export default reservationRouter