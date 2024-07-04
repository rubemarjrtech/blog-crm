import { Response } from 'express';
import { AdminService } from '../services/admin.service';
import { StatusCodes } from 'http-status-codes';
import { AdminLoginDTO } from '../DTOs/admin.dto';
import { BodyRequest } from './types';

export class AdminController {
   constructor(private adminService: AdminService) {} // eslint-disable-line

   public login = async (req: BodyRequest<AdminLoginDTO>, res: Response) => {
      try {
         const { username, password } = req.body;

         const adminToken = await this.adminService.login({
            username,
            password,
         });

         if (!adminToken) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message:
                  'Either username or password were incorrect, please try again',
            });
         }

         res.status(StatusCodes.OK).json({
            token: adminToken,
         });
      } catch (err) {
         console.log(err);

         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong',
         });
      }
   };
}
