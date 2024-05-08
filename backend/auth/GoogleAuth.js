const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const AuthorModel = require("../models/AuthorModel.js");
const generateJWT = require("../middlewares/authentication.js");
require("dotenv").config();

const options = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
};

const googleStrategy = new GoogleStrategy(
  options,
  async (_accessToken, _refreshToken, profile, passportNext) => {
    try {
      const { email, given_name, family_name, sub, picture } = profile._json;

      const user = await AuthorModel.findOne({ email });

      if (user) {
        const accToken = await createAccessToken({
          _id: user._id,
        });
        passportNext(null, { accToken });
      } else {
        const newUser = new User({
          username: email,
          googleId: sub,
        });
        await newUser.save();

        const accToken = await generateJWT({
          username: newUser.username,
        });

        passportNext(null, { accToken });
      }
    } catch (err) {
      passportNext(err);
    }
  }
);

module.exports = googleStrategy;
