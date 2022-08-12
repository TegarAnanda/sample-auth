const router = require('express').Router();
const AuthController = require("./../../controller/auth_controller");
const { 
    isAuthenticated
} = require("./../../middleware/auth");

/**
   * @swagger
   * definitions:
   *   users:
   *     required:
   *       - username
   *       - password
   *       - name
   *     properties:
   *       username:
   *         type: string
   *       password:
   *         type: string
   *       name:
   *         type: string
   */


/**
  * @swagger
  * /signup:
  *   post:
  *     tags:
  *       - Auth
  *     produces:
  *       - application/json
  *     parameters:
  *     - name: body
  *       in: body
  *       description: sign up using email and full name
  *       required: true
  *       schema:
  *         type: object
  *         required:
  *           - username
  *           - name
  *         properties:
  *           username:
  *             type: string
  *           name:
  *             type: string
  *     responses:
  *       200
  */

router.post(
    '/signup',
    AuthController.signup
);

router.post(
    '/signin',
    AuthController.signin
);

router.post(
    '/refreshToken',
    AuthController.refreshToken
);

module.exports = router;