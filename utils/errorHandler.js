const errorHandler = (res, error, statusCode = 500) => {
    res.status(statusCode).json({ error: error.message });
};
module.exports = errorHandler;
