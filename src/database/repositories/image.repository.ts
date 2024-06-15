import { appDataSource } from '../../data-source';
import { ImageEntity } from '../../entities/image.entity';
import { Image } from '../models/image.model';

export type responseTypes = {
   path: string;
};

const getImageRepository = appDataSource.getRepository(Image);

export class ImageRepository {
   constructor(private imageModel = getImageRepository) {} // eslint-disable-line

   public async upload({
      files,
      memberId,
   }: ImageEntity): Promise<responseTypes[] | null> {
      if (Array.isArray(files) && files.length > 0) {
         const filesPath: responseTypes[] = [];

         for (let i = 0; i < files.length; i += 1) {
            // can also use an image hosting service provider
            const image = this.imageModel.create({
               path: files[i].path,
               memberId,
            });

            await this.imageModel.save(image);

            filesPath.push({
               path: image.path,
            });
         }

         console.log(filesPath);

         return filesPath;
      }

      return null;
   }
}
