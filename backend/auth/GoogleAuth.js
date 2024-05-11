const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const AuthorModel = require("../models/AuthorModel.js");
const { generateJWT } = require("../middlewares/authentication.js");
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

      console.log(user);

      if (user) {
        console.log("Ho trovato un utente");
        const accessToken = await generateJWT({
          id: user._id,
        });
        passportNext(null, { accessToken });
      } else {
        console.log("Creo un nuovo utente");
        const newUser = new AuthorModel({
          name: given_name,
          surname: family_name,
          email: email,
          avatar: picture,
          username: email,
          googleId: sub,
          password: sub,
        });
        await newUser.save();

        const accessToken = await generateJWT({
          username: newUser.username,
        });

        console.log(token.accessToken);
        console.log(accessToken);

        passportNext(null, { accessToken });
      }
    } catch (err) {
      console.log("Sono in catch");
      console.log(err);
      passportNext(err);
    }
  }
);

module.exports = googleStrategy;
