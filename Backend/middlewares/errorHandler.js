// Not Defined or Wrong API or Not Found
const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}


// Error Handler For Unsupported File Format ex.
const errorHandler = (err, req, res, next) => {
    const status = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(status).json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
}



module.exports = {
    errorHandler,
    notFound
}
