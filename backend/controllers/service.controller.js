import ServiceService from "../services/serviceService.js"
import serviceModel from "../models/serviceModel.js"

const serviceService = new ServiceService(serviceModel)

class ServiceController {

    async getAllServices(req, res, next) {
        try{
            const services = await serviceService.getAllServices();
            res.status(200).json(services)
        } catch (err) {
            next(err)
        }

    }


}


export default ServiceController