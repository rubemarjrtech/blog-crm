import { Router } from 'express';
import { ImageController } from '../controllers/image.controller';
import multerConfig from '../config/multer/multer.config';
import multer from 'multer';
import { ImageFactory } from '../factories/image.factory';

export const imageRoutes = Router();
const imageController = new ImageController(ImageFactory.getImageService());
const upload = multer(multerConfig);

imageRoutes.post('/upload', upload.array('files', 5), imageController.upload);
