import HttpError from '../errors/httpError.js';

class ReservationService {
    constructor (reservationModel, userModel, serviceModel){
        this.userModel = userModel
        this.serviceModel = serviceModel
        this.reservationModel = reservationModel
    }

    async createReservation (reservationInfo, userInfo) {
        const {servicios, placa, fecha, hora} = reservationInfo
        const placaNorm = String(placa).trim().toUpperCase()
        console.log(reservationInfo)
        if(!servicios || !placa || !fecha || !hora) {
            throw new HttpError("Debe proporcionarse los servicios, la placa del carro, la fecha y/o la hora de la reservación", 400)
        }

        const formatedDate = new Date(`${fecha}T${hora}`)
        const endDate = new Date(formatedDate);
        endDate.setHours(formatedDate.getHours() + 1)

        const cantidadReservacionesHora = await this.reservationModel.countDocuments({fecha: { $gte: formatedDate, $lt: endDate}})
        const cantidadReservacionesUsuario = await this.reservationModel.countDocuments({id_usuario: userInfo.id})

        if(cantidadReservacionesUsuario >= 3){
            throw new HttpError(`No se puede agendar más de ${cantidadReservacionesUsuario} reservas por usuario`, 409, 'out-of-bound')
        }

        if(cantidadReservacionesHora >= 3){
            throw new HttpError(`No se puede agender más reservaciones para la hora ${hora}`, 409)
        }

        const docs = await this.serviceModel
        .find({ nombre: { $in: servicios } }, "_id") 
        .lean();

        if(docs.length < 1){
            throw new HttpError('No se seleccionó ningún servicio', 400, 'bad-request')
        }

        const  idServicios = docs.map(d => d._id)

        const newReservation = await this.reservationModel.create({
            id_servicio: idServicios,
            id_usuario: userInfo.id,
            placa: placaNorm,
            fecha: formatedDate,
            estado: 'activo',
        })

        return newReservation
    }

    async getAllUserReservations(id) {
        const reservations = await this.reservationModel.find({id_usuario: id})
            .populate({ path: 'id_servicio', select: 'nombre costo' });

        if(!reservations){
            throw new HttpError("El id proporcionado no existe", 400)
        }

        return reservations;

    }

    async filterReservations(filterInfo) {
        const isSet = v => v !== undefined && v !== null && v !== '';

        if (!filterInfo || Object.keys(filterInfo).length === 0) {
            return this.reservationModel
            .find({})
            .populate({ path: 'id_usuario', select: 'username email' })
            .populate({ path: 'id_servicio', select: 'nombre costo' })
            .lean();
        }

        const { placa, estado, inicio, fin, username, servicio } = filterInfo;

        let baseFilter = {
            ...(isSet(placa)  && { placa }),
            ...(isSet(estado) && { estado }),
        };

        if (isSet(fin)) {
            baseFilter = { ...baseFilter, fecha: fin };
        }

        if (isSet(inicio) || isSet(fin)) {
            baseFilter.fecha = {
            ...(isSet(inicio) && { $gte: new Date(inicio) }),
            ...(isSet(fin)    && { $lte: new Date(fin) }),
            };
        }

        let reservas = await this.reservationModel
            .find(baseFilter)
            .populate({
                path: 'id_usuario',
                match: isSet(username) ? { username } : undefined,
                select: 'username email',
            })
            .populate({
                path: 'id_servicio',
                match: isSet(servicio) ? { nombre: servicio } : undefined,
                select: 'nombre costo',
            })
            .lean();

        if (isSet(username)) reservas = reservas.filter(r => r.id_usuario);
        if (isSet(servicio)) reservas = reservas.filter(r => r.id_servicio.length > 0);

        if(reservas.length === 0){
            throw new HttpError('No se ha encontrado ninguna reserva con las condiciones dadas', 400)
        }

        return reservas;
        }

        async cancelReservation(reservationId){
            const isValidReservation = await this.reservationModel.findOne({_id: reservationId})
                
            if(!isValidReservation){
                throw new HttpError('No se ha encontrado ninguna reservación', 400, 'not-found')
            }

            if(isValidReservation.estado !== 'cancelado'){
                const reservaCancelada = await this.reservationModel.findByIdAndUpdate(reservationId, {estado: 'cancelado'}, {new: true})
                await this.reservationModel.findByIdAndDelete(reservationId) 
                return reservaCancelada;
            } else {
                throw new HttpError('La reservación no se encuentra activa')
            }
        }

        async updateReservation(id, estado) {
            const validStatuses = ["activo", "en curso", "completado", "cancelado"]
            const isStatusValid = validStatuses.find(status => status === estado)

            if(!isStatusValid){
                throw new HttpError('El estado no es valido', 400, 'invalid-data')
            }
            
            const isValidReservation = await this.reservationModel.findOne({_id: id})

            if(!isValidReservation){
                throw new HttpError('No se ha encontrado ninguna reservación', 400, 'not-found')
            }

            if(estado === isValidReservation.estado){
                throw new HttpError(`El estado "${estado}" ya se encuentra seleccionado`, 400)
            }

            if(estado === 'cancelado'){
                throw new HttpError(`El estado "${estado}" no puede ser alterado`, 400)
            }

            try{
                const updatedReservation = await this.reservationModel.findByIdAndUpdate(id, { estado: estado }, { new: true })

                return updatedReservation
            } catch (err) {
                throw new HttpError(err.message, 500)
            }

        }

    }

export default ReservationService

