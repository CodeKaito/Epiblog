const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "dkj3atfao",
  api_key: "132136827968491",
  api_secret: "IW5Y5s5w7IVkqvSb3sp_9mAjSbc",
});

const multerUpload = multer({ storage: storage }).single("avatar");

export default multerUpload;
