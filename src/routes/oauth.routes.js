const express = require("express");
const router = express.Router();
const passport = require("passport");
const oauthController = require("../controllers/oauth.controller");

/**
 * @swagger
 * tags:
 *   name: OAuth
 *   description: OAuth API
 */

/**
 * @swagger
 * /oauth/google:
 *   get:
 *     summary: Login with Google
 *     tags: [OAuth]
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
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

/**
 * @swagger
 * /oauth/google/callback:
 *   get:
 *     summary: Login with Google
 *     tags: [OAuth]
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  oauthController.googleCallback
);

module.exports = router;
