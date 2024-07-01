import { UserLoginDTO } from '../DTOs/user.dto';
import { UserRepository } from '../database/repositories/user.repository';

export class UserService {
   constructor(private userRepository: UserRepository) {} // eslint-disable-line

   public async login({
      username,
      password,
   }: UserLoginDTO): Promise<string | null> {
      const userToken = await this.userRepository.login({ username, password });

      return userToken;
   }
}
