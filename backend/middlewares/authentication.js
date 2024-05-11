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
      console.log("Sono l'authMiddleware:" + req.headers.authorization);
      const token = req.headers.authorization.replace("Bearer ", "");
      const decoded = await exports.verifyJWT(token);

      if (decoded.exp) {
        delete decoded.iat;
        delete decoded.exp;

        const me = await AuthorModel.findById(decoded.id);

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
    console.log("Sono il catch dell'authentication.js");
    res.status(400).send("Token error: " + err.message);
    next(err);
  }
};
