const jwt = require("jsonwebtoken");
const Author = require("../models/AuthorModel");

// Funzione per generare un token JWT
exports.generateJWT = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "30d" },
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
      const decoded = await exports.verifyJWT(
        req.headers.authorization.replace("Bearer ", "")
      );

      if (decoded.exp) {
        delete decoded.iat;
        delete decoded.exp;

        const me = await Author.findOne({
          ...decoded,
        });

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
    next(err);
  }
};
