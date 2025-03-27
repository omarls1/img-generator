const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

const userRoute = require("./routes/userRoute");
const commentsRoute = require("./routes/commentsRoute");
const likesRoute = require("./routes/likesRoute");
const imageRoute = require("./routes/imageRoute");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/comments", commentsRoute);
app.use("/api/v1/likes", likesRoute);
app.use("/api/v1/images", imageRoute);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went very wrong 😥",
    });
  }
});

module.exports = app;
