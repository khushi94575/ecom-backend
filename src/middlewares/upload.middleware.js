const apiError = require("../utils/apiError");
const multer = require("multer");

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const VIDEO_TYPES = ["video/mp4"];

const fileFilter = (_req, file, cb) => {
  if ([...IMAGE_TYPES, ...VIDEO_TYPES].includes(file.mimetype)) {
    return cb(null, true);
  }

  cb(apiError(400, "Only jpeg, png, webp or mp4 files are allowed"));
};

const createUploader = ({ maxSizeMb = 2 } = {}) => {
  return multer({
    storage: multer.memoryStorage(),
    fileFilter,
    limits: {
      fileSize: maxSizeMb * 1024 * 1024,
    },
  });
};

const upload = createUploader({ maxSizeMb: 2 });

const uploadMedia = createUploader({ maxSizeMb: 10 });

module.exports = {
  upload,
  uploadMedia,
  createUploader,
};
