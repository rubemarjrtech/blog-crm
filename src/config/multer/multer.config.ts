import { Request } from 'express';
import multer from 'multer';
import path, { extname, resolve } from 'node:path';
import { v4 } from 'uuid';

export default {
   storage: multer.diskStorage({
      destination: resolve(__dirname, '..', '..', '..', 'uploads'),
      filename: function (_, file, cb) {
         return cb(null, v4() + extname(file.originalname));
      },
   }),
   fileFilter: (
      req: Request,
      file: Request['file'],
      cb: multer.FileFilterCallback,
   ) => {
      const filetypes = /jpeg|jpg|png/;
      const extname = filetypes.test(
         path.extname(file!.originalname).toLowerCase(),
      );
      const mimetype = filetypes.test(file!.mimetype);

      if (mimetype && extname) {
         return cb(null, true);
      } else {
         req.res!.status(422).json({
            message: 'Error: Images only! (jpeg, jpg, png)',
         });
      }
   },
};
