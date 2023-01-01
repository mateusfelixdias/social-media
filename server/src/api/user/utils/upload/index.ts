import path from 'path';
import multer from 'multer';

export const upload = multer({
  storage: multer.diskStorage({
    destination: (request, file, callback) => {
      callback(
        null,
        path.resolve(__dirname, '../../../../../', 'public/assets')
      );
    },
    filename: (request, file, callback) => {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});
