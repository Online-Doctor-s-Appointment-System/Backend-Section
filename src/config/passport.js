const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = require("./google");
const { oauthLogin } = require("../services/oauth.service");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_REDIRECT_URI,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const result = await oauthLogin({
          provider: "google",
          providerId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          phone:
            profile.phoneNumbers && profile.phoneNumbers.length > 0
              ? profile.phoneNumbers[0].value
              : null,
        });
        return done(null, result.user);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

module.exports = passport;
