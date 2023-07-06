const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;
const connectDB = require('./Config/db');

connectDB();
const app = express();

app.listen(PORT,() => console.log(`Server Running on ${PORT}`));
