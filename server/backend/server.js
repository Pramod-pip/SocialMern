const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT;
const connectDB = require("./Config/db");

connectDB();
const app = express();

app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/images', express.static('uploads'));

app.use("/api/user", require("./Routes/UserRoutes"));
app.use("/api/feeds", require("./Routes/FeedRoutes"));

app.listen(PORT, () => console.log(`Server Running on ${PORT}`));
