import { AdminLoginDTO } from '../DTOs/admin.dto';
import { Admin } from '../database/models/admin.model';
import { AdminRepository } from '../database/repositories/admin.repository';

export class AdminService {
   constructor(private adminRepository: AdminRepository) {} // eslint-disable-line

   public async login({
      username,
      password,
   }: AdminLoginDTO): Promise<Admin | null> {
      const admin = await this.adminRepository.login({
         username,
         password,
      });

      return admin;
   }
}
