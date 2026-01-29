const express = require("express");
const passport = require("./config/passport");
const authRoutes = require("./routes/auth.routes");
const oauthRoutes = require("./routes/oauth.routes");
const adminRoutes = require("./routes/admin.routes");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(morgan("dev")); //to log the request to the console
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/oauth", oauthRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
