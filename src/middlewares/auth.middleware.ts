import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AuthService from '../services/auth.service';

export function authMiddleware(
   req: Request,
   res: Response,
   next: NextFunction,
) {
   const headerVerification = req.headers.authorization;

   const token = headerVerification?.split(' ')[1];

   try {
      const validatedUser = AuthService.validateToken(token as string);
      req.decoded = validatedUser;
      next();
   } catch (err) {
      res.status(StatusCodes.UNAUTHORIZED).json({
         message: 'You are not allowed to do this action',
      });
   }
}
