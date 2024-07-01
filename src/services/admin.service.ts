import { AdminLoginDTO } from '../DTOs/admin.dto';
import { AdminRepository } from '../database/repositories/admin.repository';

export class AdminService {
   constructor(private adminRepository: AdminRepository) {} // eslint-disable-line

   public async login({
      username,
      password,
   }: AdminLoginDTO): Promise<string | null> {
      const adminToken = await this.adminRepository.login({
         username,
         password,
      });

      return adminToken;
   }
}
