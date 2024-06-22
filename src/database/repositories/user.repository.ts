import { appDataSource } from '../../data-source';
import AuthService from '../../services/auth.service';
import { User } from '../models/user.model';

const getUserRepository = appDataSource.getRepository(User);

export class UserRepository {
   constructor(private userModel = getUserRepository) {} // eslint-disable-line

   public async login(
      username: string,
      password: string,
   ): Promise<string | null> {
      const user = await this.userModel.findOneBy({ username });

      if (!user) {
         return null;
      }

      const compare = await AuthService.comparePassword(
         password,
         user.password,
      );

      if (!compare) {
         return null;
      }

      const userPayload = {
         userId: user.userId,
         username: user.username,
      };

      const userToken = AuthService.generateToken(userPayload);

      return userToken;
   }
}
