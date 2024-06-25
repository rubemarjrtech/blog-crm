import { Router } from 'express';
import { ImageController } from '../controllers/image.controller';
import multer from 'multer';
import multerConfig from '../config/multer/multer.config';
import { ImageFactory } from '../factory/image.factory';
import { authMiddleware } from '../middlewares/auth.middleware';

export const imageRoutes = Router();
const imageController = new ImageController(ImageFactory.getImageService());
const upload = multer(multerConfig);

imageRoutes.post(
   '/upload',
   authMiddleware,
   upload.array('files', 5),
   imageController.upload,
);
