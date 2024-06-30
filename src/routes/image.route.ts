import { Router } from 'express';
import { ImageController } from '../controllers/image.controller';
import multer from 'multer';
import multerConfig from '../config/multer/multer.config';
import { ImageFactory } from '../factory/image.factory';
import { userAuthMiddleware } from '../middlewares/auth.middleware';

export const imageRoutes = Router();
const imageController = new ImageController(ImageFactory.getImageService());
const upload = multer(multerConfig);

imageRoutes.post(
   '/upload',
   userAuthMiddleware,
   upload.array('files', 5),
   imageController.upload,
);
