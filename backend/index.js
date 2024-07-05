const express = require("express");
const dotenv = require("dotenv");

var cors = require("cors");

var path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dotenv.config();

var APIRouter = require("./Routes/Route");
app.use("/api", APIRouter);

app.use(express.static(path.join(__dirname, "public")));

//app.use('/api/BoothMaster', require('./APIController/BoothMaster'));

app.listen(process.env.PORT, () => {
  console.log(
    `Server started running on ${process.env.PORT} for ${process.env.NODE_ENV}`
  );
});
