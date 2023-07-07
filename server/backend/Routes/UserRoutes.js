const express = require('express');
const { createUser } = require('../Controllers/UserController');

const Router = express.Router();

Router.route('/').post(createUser);

module.exports = Router