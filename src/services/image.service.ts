import {
   ImageRepository,
   responseTypes,
} from '../database/repositories/image.repository';
import { ImageEntity, ImageTypes } from '../entities/image.entity';

export class ImageService {
   constructor(private imageRepository: ImageRepository) {} // eslint-disable-line

   public async upload({
      files,
      memberId,
   }: ImageTypes): Promise<responseTypes[] | null> {
      const filestoUpload = new ImageEntity({ files, memberId });

      const imageUrls = await this.imageRepository.upload(filestoUpload);

      return imageUrls;
   }
}
