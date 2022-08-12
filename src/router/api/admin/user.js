const router = require('express').Router();
const UsersController = require("./../../../controller/users_controller");
const { 
    validateRole,
    isAuthenticated
} = require("./../../../middleware/auth");

router.get(
    '/', 
    isAuthenticated,
    validateRole(['admin']), 
    UsersController.getUsers
);

router.get(
    '/:id', 
    isAuthenticated,
    validateRole(['admin']),
    UsersController.getUserById
);

router.post(
    '/', 
    isAuthenticated,
    validateRole(['admin']),
    UsersController.getUserById
);

module.exports = router;