
class HttpError extends Error {
    constructor(message, status, errorType){
        super(message)
        this.status = status; 
        this.errorType = errorType
    }
}

export default HttpError;