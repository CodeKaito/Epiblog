import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../models/AuthorModel.js";
import { generateJWT } from "../middlewares/authentication.js";

dotenv.config();

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

      const user = await User.findOne({ email });

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

export default googleStrategy;
