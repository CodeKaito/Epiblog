const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storageAvatar = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "avatars",
  },
});
const storagePosts = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "posts",
  },
});

const cloudinaryMiddleware = multer({ storage: storageAvatar }).single(
  "avatar"
);
const cloudinaryPostsMiddleware = multer({ storage: storagePosts }).single(
  "posts"
);

(module.exports = cloudinaryMiddleware), cloudinaryPostsMiddleware;
