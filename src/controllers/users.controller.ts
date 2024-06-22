import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserService } from '../services/user.service';

export class UserController {
   constructor(private userService: UserService) {} // eslint-disable-line

   public login = async (req: Request, res: Response): Promise<Response> => {
      try {
         const { username, password } = req.body;

         const userToken = await this.userService.login(username, password);

         if (!userToken) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: 'Either password or username was incorrect',
            });
         }

         return res.status(StatusCodes.OK).json({ token: userToken });
      } catch (err) {
         console.log(err);

         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong',
         });
      }
   };
}
