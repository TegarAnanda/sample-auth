const customError = require('./custom_error');
const { logger } = require('./logger.js');
/**
 * Return success response object
 * @param {Any} param0 : data
 * @param {?Number} param1 : status code
 * @return {Object}
 */
function successResponse({ statusCode = 200, data, message }) {
    let res = {
        code: statusCode,
        success: true
    }
    if (data) res.data = data;
    if (message) res.message = message;
    return res;
}

/**
 * Return failure response object
 * @param {Object} req
 * @param {Object} res
 * @param {Object} err
 * @return {Object}
 */
function failureResponse(req, res, err) {
    const response = {
        code: err.code || 500,
        success: false,
        error_message: err.message,
    };
    if (err instanceof customError.ValidationError || err instanceof customError.NotAllowed || err.code == 422) {
        response.code = 422;
        res.status(422);
    }
    if (err instanceof customError.ResourceNotFoundError) {
        response.code = 404;
        res.status(404);
    }
    if (response.code === 500) {
        res.status(500);
        response.error_message = 'Something went wrong.';
    };
    logger.log({level: "error", message: err});
    return res.send(response);
}

module.exports = {
    successResponse,
    failureResponse,
};
