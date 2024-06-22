import { UserRepository } from '../database/repositories/user.repository';
import { UserService } from '../services/user.service';

export default class UserFactory {
   static userService: UserService;

   public static getUserService(): UserService {
      if (this.userService) {
         return this.userService;
      }

      const userRepository = new UserRepository();
      const userService = new UserService(userRepository);

      this.userService = userService;

      return userService;
   }
}
