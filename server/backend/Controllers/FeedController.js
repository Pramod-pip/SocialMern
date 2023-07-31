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

const updateFeed = async (req, res) => {
  let feedDelete = await Feeds.findById(req.body.feed_id);
  
  const filnames = req.files.map((filename) => {
    return filename.filename;
  });
  feedDelete.feed_images.map((img) => filnames.push(img));
  
  let feed = {
    feed_email: req.body.email,
    feed_message: req.body.message,
    feed_images: filnames,
    feed_likes: 0,
    feed_comments: "",
  };
  feed = await Feeds.findByIdAndUpdate(req.body.feed_id, feed, {
    new: true,
  })
  if (!feed)
    return res.status(200).json({ status: 400, message: "Feed Not Uploaded" });

  res.status(200).json({ status: 200, message: "Feed Uploaded" });
};

const updateDeleteImg =  async (req, res) => {
  let feedDelete = await Feeds.findById(req.body.feed_id);
  feedDelete.feed_images = feedDelete.feed_images.filter( img => img !== req.body.image)
  feedDelete = await Feeds.findByIdAndUpdate(req.body.feed_id, feedDelete, {
    new: true,
  })
  if (!feedDelete)
    return res.status(200).json({ status: 400, message: "Feed Not Uploaded" });

  res.status(200).json({ status: 200, message: "Feed Uploaded" });
};

const updateLike =  async (req, res) => {
  let updateLikes = await Feeds.updateOne({_id: req.body.feed_id},{$inc: { feed_likes: 1 }});
  if (!updateLikes)
  return res.status(200).json({ status: 400, message: "Likes Not Uploaded" });

res.status(200).json({ status: 200, message: "Like Increased" });
}
module.exports = {
  uploadFeed,
  getFeeds,
  deleteFeed,
  updateFeed,
  updateDeleteImg,
  updateLike,
};
