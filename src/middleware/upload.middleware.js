const apiError = require("../utils/apiError");
const multer = require("multer")

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const VIDEO_TYPES = ['video/mp4'];


const fileFilter = (_req, file, cb) => {
  if ([...IMAGE_TYPES, ...VIDEO_TYPES].includes(file.mimetype)) return cb(null, true);
  cb(apiError(400, 'Only jpeg, png, webp or mp4 files are allowed'));
};


 const createUploader = ({ maxSizeMb = 2 } = {}) =>
  multer({
    storage: multer.memoryStorage(),
    fileFilter,
    limits: { fileSize: maxSizeMb * 1024 * 1024 },
  });

// Categories, brands, banners, return photos: one small image.
 const upload = createUploader({ maxSizeMb: 2 });

// Products: up to five images plus a short clip, so a bigger ceiling.
 const uploadMedia = createUploader({ maxSizeMb: 10 });

/* Usage:
     upload.single('image')                              -> req.file
     uploadMedia.fields([{ name:'images', maxCount:5 },
                         { name:'video',  maxCount:1 }]) -> req.files.images / req.files.video

   IMPORTANT: the upload middleware must run BEFORE validate(), because until
   multer has parsed the multipart body, req.body is empty.                */
module.exports = {upload,uploadMedia,createUploader }