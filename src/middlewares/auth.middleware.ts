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
   const { accessToken, refreshToken } = req.cookies;

   try {
      const validatedUser = AuthService.validateUserAccessToken(
         accessToken as string,
      );
      req.decodedUser = validatedUser;
      next();
   } catch (err) {
      if (err instanceof TokenExpiredError) {
         try {
            const validatedUser = AuthService.validateUserRefreshToken(
               refreshToken as string,
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
               sessionId: session.id,
            });

            res.cookie('accessToken', newAccessToken, {
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

export function adminAuthMiddleware(
   req: Request,
   res: Response,
   next: NextFunction,
): void {
   const headerVerification = req.headers.authorization;

   const token = headerVerification?.split(' ')[1];

   try {
      const validatedAdmin = AuthService.validateAdminToken(token as string);
      req.decodedAdmin = validatedAdmin;
      next();
   } catch (err) {
      res.status(StatusCodes.UNAUTHORIZED).json({
         message: 'You are not allowed to do this action',
      });
   }
}
