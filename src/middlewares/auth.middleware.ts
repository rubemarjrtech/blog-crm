import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AuthService from '../services/auth.service';

export function userAuthMiddleware(
   req: Request,
   res: Response,
   next: NextFunction,
): void {
   const headerVerification = req.headers.authorization;

   const token = headerVerification?.split(' ')[1];

   try {
      const validatedUser = AuthService.validateUserToken(token as string);
      req.decodedUser = validatedUser;
      next();
   } catch (err) {
      res.status(StatusCodes.UNAUTHORIZED).json({
         message: 'You are not allowed to do this action',
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
