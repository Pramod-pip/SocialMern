const express = require('express');
const { createUser, userlogin } = require('../Controllers/UserController');

const Router = express.Router();

Router.route('/').post(createUser);
Router.route('/login').post(userlogin);

module.exports = Router