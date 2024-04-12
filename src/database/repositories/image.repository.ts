import { appDataSource } from '../../data-source';
import { Image } from '../models/image.model';

export const imageRepository = appDataSource.getRepository(Image);
