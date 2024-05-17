const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv")
const postRoutes = require("./routes/postsRoutes");
const userRoutes = require("./routes/userRoutes")

const app = express();
dotenv.config(); 

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => app.listen(port, () => console.info(`Server running on port: ${port}`)))
  .catch((err) => console.error(err));
