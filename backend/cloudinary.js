
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "daqrap32m",
  api_key: "283573297842516",
  api_secret: "E9NqLBAcStw6TMac-siywOTi2S8"
});
module.exports = cloudinary;