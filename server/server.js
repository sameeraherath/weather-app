require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("./config/passport");

const app = express();

app.use(
  cors({
    origin: "weather-app-client-three.vercel.app",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB Connected"));

app.use("/auth", require("./routes/auth"));
app.use("/api/weather", require("./routes/weather"));

app.listen(5000, () => console.log("Server started on port 5000"));
