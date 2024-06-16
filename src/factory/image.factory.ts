import { ImageRepository } from '../database/repositories/image.repository';
import { ImageService } from '../services/image.service';

export class ImageFactory {
   private static imageService: ImageService;

   public static getImageService(): ImageService {
      if (this.imageService) {
         return this.imageService;
      }

      const imageRepository = new ImageRepository();
      const imageService = new ImageService(imageRepository);

      this.imageService = imageService;

      return imageService;
   }
}
