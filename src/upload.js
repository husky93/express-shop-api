import multer from 'multer';
import util from 'util';
import path from 'path';
import settings from '../settings';

const MAX_SIZE = settings.UPLOAD_MAX_FILE_SIZE * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      path.join(settings.PROJECT_DIR, 'resources/static/assets/uploads/')
    );
  },
  filename: (req, file, cb) => {
    cb(null, req.newFileName + path.extname(file.originalname));
  },
});

const uploadFile = multer({
  storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter: (req, file, cb) => {
    const acceptableExtensions = ['png', 'jpg', 'jpeg', 'jpg'];
    if (
      !acceptableExtensions.some(
        (extension) =>
          path.extname(file.originalname).toLowerCase() === `.${extension}`
      )
    ) {
      return cb(
        new Error(
          `Extension not allowed, accepted extensions are ${acceptableExtensions.join(
            ','
          )}`
        )
      );
    }
    cb(null, true);
  },
}).single('cover_img');

export default util.promisify(uploadFile);
