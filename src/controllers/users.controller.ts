import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserService } from '../services/user.service';
import { UserLoginDTO } from '../DTOs/user.dto';
import { BodyRequest } from './types';
import { SessionRepository } from '../database/repositories/session.repository';
import { SessionService } from '../services/session.service';
import AuthService, {
   UserPayload,
   UserSessionPayload,
} from '../services/auth.service';

const sessionRepository = new SessionRepository();
const sessionService = new SessionService(sessionRepository);

export class UserController {
   constructor(private userService: UserService) {} // eslint-disable-line

   public login = async (
      req: BodyRequest<UserLoginDTO>,
      res: Response,
   ): Promise<Response> => {
      try {
         const { username, password } = req.body;

         const user = await this.userService.login({
            username,
            password,
         });

         if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
               message: 'Either password or username was incorrect',
            });
         }

         const session = await sessionService.create(
            user.userId,
            user.username,
         );

         const userPayload: UserPayload = {
            userId: user.userId,
            username: user.username,
            sessionId: session.id,
         };

         const userSessionPayload: UserSessionPayload = {
            sessionId: session.id,
            userId: user.userId,
            username: user.username,
         };

         const accessToken = AuthService.generateUserAccessToken(userPayload);
         const refreshToken =
            AuthService.generateUserRefreshToken(userSessionPayload);

         res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 300000,
         });

         res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 3.156e10,
         });

         return res.status(StatusCodes.OK).json({ session });
      } catch (err) {
         console.log(err);

         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong',
         });
      }
   };

   public logout = async (req: Request, res: Response) => {
      try {
         const { userId } = req.decodedUser;
         const sessionsDeleted = await sessionService.delete(userId);

         res.cookie('accessToken', '', {
            maxAge: 0,
            httpOnly: true,
         });
         res.cookie('refreshToken', '', {
            maxAge: 0,
            httpOnly: true,
         });
         res.status(StatusCodes.OK).json({
            message: `Deleted with success. Number of sessions deleted was ${sessionsDeleted}`,
         });
      } catch (error) {
         console.log(error);
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong',
         });
      }
   };
}
