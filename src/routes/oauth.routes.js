const express = require("express");
const router = express.Router();
const passport = require("passport");
const oauthController = require("../controllers/oauth.controller");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/user.phonenumbers.read",
    ],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  oauthController.googleCallback
);

module.exports = router;
