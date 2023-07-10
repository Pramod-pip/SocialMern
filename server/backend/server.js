const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT;
const connectDB = require("./Config/db");
// const multer = require('multer');
// const { Feeds } = require('./schema/feedSchema');

connectDB();
const app = express();

app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() +'.jpg');
//     },
// });

// const upload = multer({ storage: storage });

// app.post('/upload', upload.array('images'),  async (req, res) => {

//     const filnames = req.files.map(filename => { return filename.filename})

//     let feed = new Feeds({
//         feed_email: req.body.email,
//         feed_message: req.body.message,
//         feed_images: filnames,
//         feed_likes: 0,
//         feed_comments: '',
//       });

//       console.log('Filenames', filnames);

//     feed = await feed.save();

//   if (!feed)
//     return res
//       .status(200)
//       .json({ status: 400, message: "Feed Not Uploaded" });

//   res.status(200).json({ status: 200, message: "Feed Uploaded" });

// });

app.use('/images', express.static('uploads'));

app.use("/api/user", require("./Routes/UserRoutes"));
app.use("/api/feeds", require("./Routes/FeedRoutes"));

app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
