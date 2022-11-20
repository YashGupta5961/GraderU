const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const compression = require("compression");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const AppError = require("./backend/utils/appError");
// const { extractJWTCookieToHeader } = require("./utils/customMiddleware");
const globalErrorHandler = require("./backend/controllers/errorController");

const taskRouter = require("./backend/routes/taskRoutes");

const app = express();

// middleware
app.use(cors());
app.options("*", cors());
app.use(helmet()); // Set security HTTP headers

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter); // Rate limiter
app.use(express.json({ limit: "10kb" })); // Body parser
app.use(mongoSanitize()); // Data sanitization against NoSQL query injection
app.use(xss()); // Data sanitization against XSS

// Serving static files
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/public"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/frontend/build/index.html"));
  });
}

app.use(hpp()); // Prevent parameter pollution
// app.use(extractJWTCookieToHeader()); // extract jwt cookie and set authorization header
app.use(compression());

// routes
app.use("/api/v1/tasks", taskRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
