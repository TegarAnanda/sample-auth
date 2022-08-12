const uuid = require("uuid");
const userModel = require("../models/users");
const customError = require("../utils/custom_error");
const helperFunction = require("../utils/helper_function");

/**
 *  create a new user in DB
 *  @param {String} name
 *  @param {String} username
 *  @param {String} password
 *  @return {Promise}
 */
 const createUser = (name, username, password, roles = []) => {
    const userId = uuid.v4();
    const dateNow = helperFunction.getCurrentDate();
    return userModel.create({
        _id: userId,
        name,
        username,
        password,
        lastLoginDate: dateNow,
        roles
    });
};

/**
 * Return list of users
 * @param {String} searchTerm
 * @param {Number} pageNumber
 * @param {Number} pageSize
 * @return {Promise}
 */
function getUsers(searchTerm, pageNumber, pageSize) {
    const limitAndOffset = {
        limit: pageSize,
        skip: (pageNumber - 1) * pageSize,
    };
    let filter = {};
    if (searchTerm) {
        filter = { $or: [
            { name: {'$regex': `^${searchTerm}$`, '$options': 'i'} }, 
            { email: {'$regex': `^${searchTerm}$`, '$options': 'i'} }
        ]};
    }
    return Promise.all([
        userModel.find(filter, {}, limitAndOffset).select("-password"),
        userModel.countDocuments(filter),
    ]);
}

/**
 * Return User if matches the id
 * @param {string} id id of the user
 * @return {?User} return user
 */
 async function getUserById(id) {
    const user = await userModel.findOne({ _id: id }).select("-password");
    if (!user) {
        throw new customError.ResourceNotFoundError('User not found');
    }
    return user;
}

/**
 * Return User if matches the username
 * @param {string} username id of the user
 * @return {?User} return user
 */
 async function getUserByUsername(username) {
    const user = await userModel.findOne({ username });
    return user;
}

/**
 * Update lastLoginDate
 * @param {String} id
 * @return {Promise}
 */
 const updateUserLastLoginDate = async (id) => {
    return userModel.updateOne(
        { id },
        { lastLoginDate: helperFunction.getCurrentDate()},
    );
};

/**
 * Update user
 * @param {String} id
 * @return {Promise}
 */
 const updateUser = async (id, payload) => {
    return userModel.updateOne(
        { id },
        payload,
    );
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    getUserByUsername,
    updateUserLastLoginDate,
    updateUser
}