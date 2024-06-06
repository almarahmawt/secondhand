const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: 'dxyodefsp',
  api_key: '319926417631125',
  api_secret: '98dZ3R6K5Ka5UNw_RiCYuhawM0A'
});

module.exports = cloudinary;
