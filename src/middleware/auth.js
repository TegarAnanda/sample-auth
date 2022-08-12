const jwt = require('jsonwebtoken');
const responseUtil = require('../utils/response_util');
const AuthMiddleware = {};

AuthMiddleware.isAuthenticated = async (req, res, next) => {
    const err = {
        message: 'Not Authorized',
        code: 401,
    };
    if (!req.headers.authorization) {
        return responseUtil.failureResponse(req, res, err);
    }
    const [Bearer, token] = req.headers.authorization.split(' ');

    if (!Bearer || Bearer !== 'Bearer') {
        return responseUtil.failureResponse(req, res, err);
    }

    if (!token) {
        return responseUtil.failureResponse(req, res, err);
    }

    jwt.verify(token, global.Config.auth.jwt_secret, (err, decoded) => {
        if (err) {
            return responseUtil.failureResponse(req, res, { code: 401, message: 'please provide a vaid token ,your token might be expired'});
        }
        req.user = decoded.user;
        req.user.token = token;
        next();
    });
};

AuthMiddleware.validateRole = (roles = []) => {
    return function(req, res, next) {
        const {user} = req;
        const err = {
            message: 'Not Allowed',
            code: 401,
        };
        if (!user || !user.roles || !user.roles.length) return responseUtil.failureResponse(req, res, err);
        roles.push(...['super-admin']);
        const allowedRolesMap = roles.reduce((map, role) => {
            map[role] = true;
            return map;
        }, {});
        if (!user.roles.some((role) => !!allowedRolesMap[role])) return responseUtil.failureResponse(req, res, err);
        next();
    };
};

module.exports = AuthMiddleware;