const express = require("express");
const { uploadFeed } = require("../Controllers/FeedController");
const multer = require("multer");
const { Feeds } = require("../schema/feedSchema");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + ".jpg");
  },
});

const upload = multer({ storage: storage });

const Router = express.Router();
Router.route("/").post(upload.array("images"), uploadFeed);

module.exports = Router;
