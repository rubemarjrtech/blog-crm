import multer from 'multer';
import { extname, resolve } from 'node:path';
import { v4 } from 'uuid';

export default {
   storage: multer.diskStorage({
      destination: resolve(__dirname, '..', '..', '..', 'uploads'),
      filename: function (_, file, cb) {
         return cb(null, v4() + extname(file.originalname));
      },
   }),
   fileFilter: (_, file, cb) => {
      if (!file.mimetype.match(/png||jpeg||jpg||gif$i/)) {
         cb(new Error('invalid image format!'));
         return;
      }

      cb(null, true);
   },
};
