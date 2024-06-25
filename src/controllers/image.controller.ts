import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ImageService } from '../services/image.service';

export class ImageController {
   constructor(private imageService: ImageService) {} // eslint-disable-line

   public upload = async (req: Request, res: Response): Promise<Response> => {
      const files = req.files;
      const memberId = req.decoded?.userId;

      if (!files) {
         return res.status(StatusCodes.NOT_FOUND).json({
            message: 'No image to upload was found',
         });
      } else if (!memberId) {
         return res.status(StatusCodes.UNAUTHORIZED).json({
            message: 'You are not allowed to do this action',
         });
      }

      try {
         const filesPath = await this.imageService.upload({ files, memberId });

         return res.status(StatusCodes.OK).json(filesPath);
      } catch (err) {
         console.log(err);

         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong, could not finish uploading images',
         });
      }
   };
}
