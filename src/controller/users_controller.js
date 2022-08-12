const userService = require("../services/user_service");
const responseUtil = require('../utils/response_util');
const helperFunction = require('../utils/helper_function');
const validators = require('../validators');

async function getUsers(req, res) {
    try {
        const {
          page: pageNumber,
          search_term: searchTerm,
          page_size: pageSize,
        } = req.query;
        const [data, itemCount] = await userService.getUsers(
            searchTerm,
            pageNumber,
            pageSize,
        );
        return res.json(
            responseUtil.successResponse({
              data: helperFunction.generatePaginatedResponse({
                itemCount,
                data,
                page: pageNumber,
                pageSize,
              }),
            }),
        );
    } catch (err) {
        return responseUtil.failureResponse(req, res, err);
    }  
}

async function getUserById(req, res) {
    try {
        const user = await userService.getUserById(req.params['id']);
        return res.json(responseUtil.successResponse({data: user}));
    } catch (err) {
        return responseUtil.failureResponse(req, res, err);
    }
}

async function getUserProfile(req, res) {
    try {
        const user = await userService.getUserById(req.user.userId);
        return res.json(responseUtil.successResponse({data: user}));
    } catch (err) {
        return responseUtil.failureResponse(req, res, err);
    }
}

async function updateUserProfile(req, res) {
    try {
        validators.validateSchema(
            validators.userSchema.updateUser,
            req.body
        )
        await userService.updateUser(req.user.userId, req.body);
        return res.json(responseUtil.successResponse({message: "user profile has been updated"}));
    } catch (err) {
        return responseUtil.failureResponse(req, res, err);
    }
}

module.exports = {
    getUsers,
    getUserById,
    getUserProfile,
    updateUserProfile
};