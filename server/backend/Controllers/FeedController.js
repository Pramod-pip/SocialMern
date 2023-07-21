const { Feeds } = require("../schema/feedSchema");

const uploadFeed = async (req, res) => {
  const filnames = req.files.map((filename) => {
    return filename.filename;
  });

  let feed = new Feeds({
    feed_email: req.body.email,
    feed_message: req.body.message,
    feed_images: filnames,
    feed_likes: 0,
    feed_comments: "",
  });
  feed = await feed.save();

  if (!feed)
    return res.status(200).json({ status: 400, message: "Feed Not Uploaded" });

  res.status(200).json({ status: 200, message: "Feed Uploaded" });
};

const getFeeds = async (req, res) => {
  const feedsList = await Feeds.find();
  if(!feedsList) return res.status(200).json({status: 500, message: 'No Posts Available'})

  res.status(200).send(feedsList);
};

const deleteFeed = async (req, res) => {
  const feedDelete = await Feeds.findByIdAndDelete(req.body.feed_id);
  if(feedDelete) return res.status(200).json({status: 200, message: 'Post Deleted Succesfully'})
};

module.exports = {
  uploadFeed,
  getFeeds,
  deleteFeed,
};
