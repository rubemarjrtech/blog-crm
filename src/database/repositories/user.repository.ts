import { UserLoginDTO } from '../../DTOs/user.dto';
import { appDataSource } from '../../data-source';
import AuthService from '../../services/auth.service';
import { User } from '../models/user.model';

const userRepository = appDataSource.getRepository(User);

export class UserRepository {
   constructor(private userModel = userRepository) {} // eslint-disable-line

   public async login({
      username,
      password,
   }: UserLoginDTO): Promise<string | null> {
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

      const userPayload: Partial<User> = {
         userId: user.userId,
         username: user.username,
      };

      const userToken = AuthService.generateUserToken(userPayload);

      return userToken;
   }
}
