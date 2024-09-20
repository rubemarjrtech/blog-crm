import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AuthService from '../services/auth.service';
import { TokenExpiredError } from 'jsonwebtoken';
import { SessionRepository } from '../database/repositories/session.repository';
import { SessionService } from '../services/session.service';

const sessionRepository = new SessionRepository();
const sessionService = new SessionService(sessionRepository);

export async function userAuthMiddleware(
   req: Request,
   res: Response,
   next: NextFunction,
): Promise<void> {
   const { userAccessToken, userRefreshToken } = req.cookies;

   try {
      const validatedUser = AuthService.validateUserAccessToken(
         userAccessToken as string,
      );
      req.decodedUser = validatedUser;
      next();
   } catch (err) {
      if (err instanceof TokenExpiredError) {
         try {
            const validatedUser = AuthService.validateUserRefreshToken(
               userRefreshToken as string,
            );
            const session = await sessionService.findOne(
               validatedUser.sessionId,
            );

            if (!session) {
               res.status(StatusCodes.UNAUTHORIZED).json({
                  message: 'Unanthorized',
               });
               return;
            }

            const newAccessToken = AuthService.generateUserAccessToken({
               ...session,
               userId: session.sessionOwnerId,
               sessionId: session.id,
            });

            res.cookie('userAccessToken', newAccessToken, {
               httpOnly: true,
               maxAge: 300000,
            });
            req.decodedUser = validatedUser;
            next();
            return;
         } catch (err) {
            res.status(StatusCodes.UNAUTHORIZED).json({
               message: 'Unauthorized',
            });
            return;
         }
      }

      res.status(StatusCodes.UNAUTHORIZED).json({
         message: 'Unauthorized',
      });
   }
}

export async function adminAuthMiddleware(
   req: Request,
   res: Response,
   next: NextFunction,
): Promise<void> {
   const { adminAccessToken, adminRefreshToken } = req.cookies;

   try {
      const validatedAdmin = AuthService.validateAdminAccessToken(
         adminAccessToken as string,
      );
      req.decodedAdmin = validatedAdmin;
      next();
   } catch (err) {
      if (err instanceof TokenExpiredError) {
         try {
            const validatedAdmin = AuthService.validateAdminRefreshToken(
               adminRefreshToken as string,
            );
            const session = await sessionService.findOne(
               validatedAdmin.sessionId,
            );

            if (!session) {
               res.status(StatusCodes.UNAUTHORIZED).json({
                  message: 'Unauthorized',
               });
               return;
            }

            const newAccessToken = AuthService.generateAdminAccessToken({
               ...session,
               adminId: session.sessionOwnerId,
               sessionId: session.id,
            });

            res.cookie('adminAccessToken', newAccessToken, {
               httpOnly: true,
               maxAge: 300000,
            });
            req.decodedAdmin = validatedAdmin;
            next();
            return;
         } catch (err) {
            res.status(StatusCodes.UNAUTHORIZED).json({
               message: 'Unauthorized',
            });
            return;
         }
      }

      res.status(StatusCodes.UNAUTHORIZED).json({
         message: 'Unauthorized',
      });
   }
}
