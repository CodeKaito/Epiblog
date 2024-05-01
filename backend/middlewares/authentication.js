const jwt = require("jsonwebtoken");
const AuthorModel = require("../models/AuthorModel");

// Funzione per generare un token JWT
exports.generateJWT = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

// Funzione per verificare un token JWT
exports.verifyJWT = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

// Middleware per l'autenticazione dell'utente
exports.authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).send("Login Required");
    } else {
      const token = req.headers.authorization.replace("Bearer ", "");
      const decoded = await exports.verifyJWT(token);

      //   console.log("Token Payload:", decoded);
      //   console.log("Token Exp:", decoded.exp);
      //   console.log("Token Iat:", decoded.iat);
      //   console.log("User Id:", decoded.id);

      if (decoded.exp) {
        delete decoded.iat;
        delete decoded.exp;

        // console.log("Token Payload after delete:", decoded);

        const me = await AuthorModel.findById(decoded.id);

        console.log(JSON.stringify(me));

        if (me) {
          req.user = me;
          next();
        } else {
          return res.status(400).send("User not found");
        }
      } else {
        return res.status(400).send("Invalid token");
      }
    }
  } catch (err) {
    res.status(400).send("Token error: " + err.message);
    next(err);
  }
};

// const me = await AuthorModel.findOne({
//   ...decoded,
// });
