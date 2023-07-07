const express = require('express');
const { insertFeed } = require('../Controllers/FeedController');

const Router = express.Router();

Router.route('/').post(insertFeed);
//Router.route('/login').post(userlogin);

module.exports = Router