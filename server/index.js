const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const morgan = require("morgan"); // pośrdniczy w rejestrowaniu żądań http dla node.js.

var jwt = require("jsonwebtoken");

dotenv.config();

app.use(helmet());
app.use(function (req, res, next) {
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  next();
});
app.use(morgan("common"));
app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers":
      "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
  });

  next();
});
app.use(
  cors({
    origin: [
      "http://localhost:3500",
      "http://localhost:3000",
      "http://localhost:4200",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  err => {
    if (err) {
      console.log("err from DB ===> " + err);
    } else {
      console.log("DB is connected successfully! ..");
    }
  }
);

app.get("/", (req, res) => {
  res.send("Start app!");
});

//Middleware

//routes
app.use("/tickets", require("./routes/tickets"));
app.use("/users", require("./routes/users"));
app.use("/flights", require("./routes/flights"));

app.listen(3500, () => {
  console.log("SERVER RUNNING!");
});
