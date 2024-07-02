import { Response } from 'express';
import { AdminRepository } from '../database/repositories/admin.repository';
import { AdminService } from '../services/admin.service';
import { StatusCodes } from 'http-status-codes';
import { AdminLoginDTO } from '../DTOs/admin.dto';
import { BodyRequest } from './types';

export class AdminController {
   public async login(req: BodyRequest<AdminLoginDTO>, res: Response) {
      try {
         const { username, password } = req.body;

         const adminRepository = new AdminRepository();
         const adminService = new AdminService(adminRepository);

         const adminToken = await adminService.login({ username, password });

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
   }
}
