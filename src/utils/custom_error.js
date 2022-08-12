/**
 * ValidationError, raise if some validation fails
 */
class ValidationError extends Error {
    /**
     * Constructor function of the Error
     * @param {String} message : message for the error
     */
    constructor(message) {
        super(message);
        this.message = message;
    }
}
  
/**
 * ResourceNotFoundError, raise if some validation fails
 */
class ResourceNotFoundError extends Error {
    /**
     * Constructor function of the Error
     * @param {String} message : message for the error
     */
    constructor(message) {
        super(message);
        this.message = message;
    }
}
  
/**
 * ValidationError, raise if some validation fails
 */
class NotAllowed extends Error {
    /**
     * Constructor function of the Error
     * @param {String} message : message for the error
     */
    constructor(message) {
        super(message);
        this.message = message;
    }
}
  
module.exports = {
    ValidationError,
    ResourceNotFoundError,
    NotAllowed,
};
  