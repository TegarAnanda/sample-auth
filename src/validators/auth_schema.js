const Joi = require("joi");

const signin = Joi.object({
    username: Joi.string().required().max(20).min(3),
    password: Joi.string().required().min(5)
});

const signup = Joi.object({
    username: Joi.string().required().max(20).min(3),
    password: Joi.string().required().min(5),
    name: Joi.string().required().max(20).min(3)
});

const refreshToken = Joi.object({
    refreshToken: Joi.string().required()
})

module.exports = {
    signin,
    signup,
    refreshToken
}