const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const options = {
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "uploads",
    },
  }),
};

const cloudinaryMiddleware = multer(options).single("cover");
const cloudinaryAvatarMiddleware = multer(options).single("avatar");

module.exports = cloudinaryMiddleware;
module.exports = cloudinaryAvatarMiddleware;
