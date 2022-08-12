const router = require('express').Router();
const UsersController = require("./../../../controller/users_controller");
const { 
    isAuthenticated
} = require("./../../../middleware/auth");

router.get(
    '/profile', 
    isAuthenticated,
    UsersController.getUserProfile
);

router.patch(
    '/profile', 
    isAuthenticated,
    UsersController.updateUserProfile
);

module.exports = router;