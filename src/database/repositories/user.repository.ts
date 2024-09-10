import { UserLoginDTO } from '../../DTOs/user.dto';
import { appDataSource } from '../../data-source';
import AuthService from '../../services/auth.service';
import { Session } from '../models/session.model';
import { User } from '../models/user.model';

export type TokensAndSession = [
   accessToken: string,
   refreshToken: string,
   session: Session,
];

export class UserRepository {
   constructor(private userModel = appDataSource.getRepository(User)) {} // eslint-disable-line

   public async login({
      username,
      password,
   }: UserLoginDTO): Promise<User | null> {
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

      return user;
   }
}
