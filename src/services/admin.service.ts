import { AdminRepository } from '../database/repositories/admin.repository';

export class AdminService {
   constructor(private adminRepository: AdminRepository) {} // eslint-disable-line

   public async login(
      username: string,
      password: string,
   ): Promise<string | null> {
      const adminToken = await this.adminRepository.login(username, password);

      return adminToken;
   }
}
