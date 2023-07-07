const { Feeds } = require('../schema/feedSchema');

const insertFeed = async (req, res) => {

    let feed = new Feeds({
      feed_email: req.body.email,
      feed_message: req.body.message,
      feed_images: req.body.images,
      feed_likes: req.body.likes,
      feed_comments: req.body.comments
    });
  
    feed = await feed.save();
  
    if (!feed)
      return res
        .status(200)
        .json({ status: 400, message: "Feed Not Saved" });
  
    res.status(200).json({ status: 200, message: "Feed Created" });
  };

  module.exports ={
    insertFeed
  }
