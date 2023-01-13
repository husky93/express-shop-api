import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import uploadFile from '../upload';
import settings from '../../settings';

const upload = async (req, res, next) => {
  try {
    const contentType = req.get('Content-Type');
    if (contentType.includes('multipart/form-data')) {
      const fileName = uuidv4();
      req.newFileName = fileName;
      await uploadFile(req, res, next);
      return next();
    }
    req.oldImageLink = req.body.cover_img;
    return next();
  } catch (err) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res
        .status(500)
        .json({ message: 'File size cannot be larger than 2MB!' });
    }
    return res.status(500).json({
      message: `Could not upload the file. ${err}`,
    });
  }
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = path.join(
    settings.PROJECT_DIR,
    '/resources/static/assets/uploads/'
  );

  res.set('Content-Type', 'image/jpeg');
  res.sendFile(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).json({
        message: 'Could not get the file. ' + err,
      });
    }
  });
};

export default { upload, download };
