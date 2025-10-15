

const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        errorType: err.errorType || "unknown-error"
    })
}

export default errorHandler