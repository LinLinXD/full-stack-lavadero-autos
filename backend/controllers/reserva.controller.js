import reservationModel from "../models/reservationModel.js";
import userModel from "../models/userModel.js";
import serviceModel from "../models/serviceModel.js";
import ReservationService from "../services/reserveService.js";

const reservationService = new ReservationService(reservationModel, userModel, serviceModel);
class ReservationController {
    constructor() {

    }

    async createReservation(req, res, next) {
        const userInfo = req.user
        const reservationInfo  = req.body   

        try{
            const reservation = await reservationService.createReservation(reservationInfo, userInfo)
            res.status(201).json({success: true, message: "Reservación creada con exito", data: reservation })
        } catch (err) {
            next(err)
        }
    }

    async getAllUserReservations(req, res, next) {
        const {id} = req.user

        try{
            const reservations = await reservationService.getAllUserReservations(id)

            return res.status(200).json({success: true, message: "Reservaciones devueltas con exito", data: reservations})

        } catch (err) {
            next(err)
        }
    }

    async filterReservations(req, res, next){
        const filterInfo = req.body

        try{
            const reservations = await reservationService.filterReservations(filterInfo)

            return res.status(200).json({success: true, message: "Se ha podido filtrar exitosamente", data: reservations})
        } catch (err) {
            next(err)
        }


    }


}

export default ReservationController