const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validators = require('../validators');
const userService = require("../services/user_service");
const responseUtil = require('../utils/response_util');
const authUtil = require('../utils/auth_util');

function generateToken(user) {
    try {
        const tokenPayload = {
            userId: user._id,
            username: user.username,
            roles: user.roles
        }
        const token = jwt.sign(
            { user: tokenPayload }, 
            global.Config.auth.jwt_secret, 
            { expiresIn: global.Config.auth.jwt_expiresin, algorithm: 'HS512' }
        );
        const refreshToken = jwt.sign(
            { user: tokenPayload }, 
            global.Config.auth.refresh_token_secret, 
            { expiresIn: global.Config.auth.refresh_token_expiresin });

        return { token, refreshToken }
    } catch(err) {
        return responseUtil.failureResponse(req, res, err);
    }  
}

async function signup(req, res) {
    try {
        const { name, username, password } = validators.validateSchema(
            validators.authSchema.signup,
            req.body
        );
        const user = await userService.getUserByUsername(username);
        if (user) {
            const err =  {message: "Username already exists", code: 400};
            return responseUtil.failureResponse(req, res, err);
        }
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const newUser = await userService.createUser(name, username, hashedPassword);
        const { token, refreshToken } = await generateToken(newUser);
        return res.json(responseUtil.successResponse({data: { token, refreshToken }}));
    } catch(err) {
        return responseUtil.failureResponse(req, res, err);
    }
}

async function signin(req, res) {
    try {
        const { username, password } = validators.validateSchema(
            validators.authSchema.signin,
            req.body
        );
        const user = await userService.getUserByUsername(username);
        if (!user) {
            const err =  {message: "user not found", code: 400};
            return responseUtil.failureResponse(req, res, err);
        }
        const passwordCheck = await bcrypt.compareSync(password, user.password);
        if (!passwordCheck) responseUtil.failureResponse(req, res, { message: "failed to login bad credentials", code: 400 });

        const { token, refreshToken } = await generateToken(user);
        userService.updateUserLastLoginDate(user._id);
        return res.json(responseUtil.successResponse({data: { token, refreshToken }, message: "User logged in Successfully"}));
    } catch(err) {
        return responseUtil.failureResponse(req, res, err);
    }
}

async function refreshToken(req, res) {
    try {
        const data = validators.validateSchema(
            validators.authSchema.refreshToken,
            req.body
        );
        const tokenFromHeader = authUtil.getTokenFromHeader(req);
		const decoded = jwt.decode(tokenFromHeader);
        if (data.refreshToken) {
            const token = jwt.sign({ user: decoded.user }, global.Config.auth.jwt_secret, { expiresIn: global.Config.auth.jwt_expiresin, algorithm: 'HS512' });
            const response = {
                token,
            };
            return res.json(responseUtil.successResponse({data: response, message: "a new token is issued"}));
        } else {
            return responseUtil.failureResponse(req, res, { code: 400, message: "no refresh token present in refresh token list"});
        }
    } catch (err) {
        return responseUtil.failureResponse(req, res, err);
    }
}

module.exports = {
    signup,
    signin,
    refreshToken
}