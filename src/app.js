const express = require("express");
const app = express();
// const helmet = require("helmet");
// const cors = require("cors");
const AuthRouter=require("./modules/auth/auth.route");
require("dotenv").config();
const cookieParser = require("cookie-parser");
// const mongoSanitization = require("express-mongo-sanitize");
const apiResponse = require("./utils/apiResponse");
const asyncHandler = require("./utils/asyncHandler");
const { apiError } = require("./utils/apiError");

app.use(express.json());
app.use("/auth",AuthRouter);
// app.use(helmet());
// app.use(cors({ origin: process.env.CORS_ORIGIN, Credential: true }));
app.use(cookieParser());
// app.use(mongoSanitization());

app.get("/api/v1/health", (req, res) =>
  res.status(200).json(
    apiResponse(
      200,
      {
        service: "ecom-backend",
        env: process.env.NODE_ENV,
        uptimeSeconds: Math.round(process.uptime()),
        timestamp: new Date().toISOString(),
      },
      "API is running",
    ),
  ),
);
app.get('/api/v1/boom',asyncHandler(async()=>{
  throw apiError(418,'This error throw on purpose')
}))

module.exports = app;
