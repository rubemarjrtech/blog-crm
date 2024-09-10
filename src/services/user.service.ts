import { UserLoginDTO } from '../DTOs/user.dto';
import { User } from '../database/models/user.model';
import { UserRepository } from '../database/repositories/user.repository';

export class UserService {
   constructor(private userRepository: UserRepository) {} // eslint-disable-line

   public async login({
      username,
      password,
   }: UserLoginDTO): Promise<User | null> {
      const user = await this.userRepository.login({
         username,
         password,
      });

      return user;
   }
}
