import HttpError from "../errors/httpError.js"


class ServiceService {
    constructor(serviceModel){
        this.serviceModel = serviceModel;
    }

    async getAllServices(){
        try{
            const services = await this.serviceModel.find()
            return services
        } catch (err) {
            console.log(err)
            throw new HttpError("An unexpected error ocurred while searching for services", 500)
        }
    }

}

export default ServiceService