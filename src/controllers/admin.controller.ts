import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';
import { StatusCodes } from 'http-status-codes';
import { AdminLoginDTO } from '../DTOs/admin.dto';
import { BodyRequest } from './types';
import { SessionRepository } from '../database/repositories/session.repository';
import { SessionService } from '../services/session.service';
import AuthService, { AdminPayload } from '../services/auth.service';

const sessionRepository = new SessionRepository();
const sessionService = new SessionService(sessionRepository);
export class AdminController {
   constructor(private adminService: AdminService) {} // eslint-disable-line

   public login = async (req: BodyRequest<AdminLoginDTO>, res: Response) => {
      try {
         const { username, password } = req.body;

         const admin = await this.adminService.login({
            username,
            password,
         });

         if (!admin) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message:
                  'Either username or password were incorrect, please try again',
            });
         }

         const session = await sessionService.create(admin.id, admin.username);
         const adminPayload: AdminPayload = {
            adminId: admin.id,
            username: admin.username,
            sessionId: session.id,
         };
         const accessToken = AuthService.generateAdminAccessToken(adminPayload);
         const refreshToken =
            AuthService.generateAdminRefreshToken(adminPayload);

         res.cookie('adminAccessToken', accessToken, {
            maxAge: 300000,
            httpOnly: true,
         });

         res.cookie('adminRefreshToken', refreshToken, {
            maxAge: 3.156e10,
            httpOnly: true,
         });

         res.status(StatusCodes.OK).json({
            session,
         });
      } catch (err) {
         console.log(err);

         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong',
         });
      }
   };

   public logout = async (req: Request, res: Response) => {
      const { adminId, username } = req.decodedAdmin;
      await sessionService.delete(adminId, username);

      res.cookie('adminAccessToken', '', {
         maxAge: 0,
         httpOnly: true,
      });
      res.cookie('adminRefreshToken', '', {
         maxAge: 0,
         httpOnly: true,
      });
      res.status(StatusCodes.OK).json({
         message: 'Logged out successfully!',
      });
   };
}
