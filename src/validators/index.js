const Joi = require("joi");
const customError = require('../utils/custom_error');
const authSchema = require("./auth_schema");
const userSchema = require("./user_schema");

/**
 * Validate request body
 * @param {Joi.schema} schema
 * @param {Object} params
 * @return {Object} validated values
 */
 function validateSchema(schema, params) {
    const {value, error} = schema.validate(params);
    if (error) {
        throw new customError.ValidationError(error.details[0].message);
    }
    return value;
  }

module.exports = {
    validateSchema,
    authSchema,
    userSchema
};