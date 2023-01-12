import multer from 'multer';
import util from 'util';
import path from 'path';
import settings from '../settings';

const MAX_SIZE = settings.UPLOAD_MAX_FILE_SIZE * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      path.join([settings.PROJECT_DIR, '/resources/static/assets/uploads/'])
    );
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

const uploadFile = multer({
  storage,
  limits: { fileSize: MAX_SIZE },
}).single('file');

export default util.promisify(uploadFile);
