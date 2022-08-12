const Joi = require("joi");

const updateUser = Joi.object({
    name: Joi.string().required().max(20).min(3),
});

module.exports = {
    updateUser
}