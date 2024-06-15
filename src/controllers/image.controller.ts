import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ImageService } from '../services/image.service';

export class ImageController {
   constructor(private imageService: ImageService) {} // eslint-disable-line

   public upload = async (req: Request, res: Response): Promise<Response> => {
      const files = req.files;
      const memberId = 1;

      try {
         const filesPath = await this.imageService.upload({ files, memberId });

         if (!filesPath) {
            return res.status(StatusCodes.NOT_FOUND).json({
               message: 'No image to upload was found',
            });
         }

         return res.status(StatusCodes.OK).json(filesPath);
      } catch (err) {
         console.log(err);

         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong, could not finish uploading images',
         });
      }
   };
}
