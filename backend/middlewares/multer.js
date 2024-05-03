const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",
  },
});

const coverStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "covers",
  },
});

const cloudinaryCoverMiddleware = multer({ storage: coverStorage }).single(
  "cover"
);
const cloudinaryAvatarMiddleware = multer({ storage }).single("avatar");

(module.exports = cloudinaryCoverMiddleware), cloudinaryAvatarMiddleware;
