const express = require("express");
const app = express();
require("dotenv").config();
const server = require("http").createServer(app);
const mongoose = require("mongoose");
const cors = require("cors");

require("./passport");

const usersRouter = require("./routes/usersRouter")();
const adminRouter = require("./routes/adminRouter")();

mongoose.connect(process.env.CONN_STRING, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => console.log("Mongoose connected successfully"),
  (err) => console.log("Mongoose could not connect to database " + err)
);

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/admin", adminRouter);

server.listen(process.env.SERVER_PORT, () => {
  console.log(`server started listening on port: ${process.env.SERVER_PORT}`);
});
