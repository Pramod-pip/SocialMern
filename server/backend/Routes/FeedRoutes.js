const express = require("express");
const { uploadFeed, getFeeds, deleteFeed, updateFeed } = require("../Controllers/FeedController");
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
Router.route("/").get(getFeeds).post(upload.array("images"), uploadFeed);
Router.route("/deleteFeed").post(deleteFeed);
Router.route("/updateFeed").post(upload.array("images"), updateFeed);

module.exports = Router;
