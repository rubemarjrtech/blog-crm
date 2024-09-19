import { AdminLoginDTO } from '../../DTOs/admin.dto';
import { appDataSource } from '../../data-source';
import AuthService from '../../services/auth.service';
import { Admin } from '../models/admin.model';

const adminRepository = appDataSource.getRepository(Admin);

export class AdminRepository {
   constructor(private adminModel = adminRepository) {} // eslint-disable-line

   public async login({
      username,
      password,
   }: AdminLoginDTO): Promise<Admin | null> {
      const admin = await this.adminModel.findOneBy({ username });

      if (!admin) {
         return null;
      }

      const auth = await AuthService.comparePassword(password, admin.password);

      if (!auth) {
         return null;
      }

      return admin;
   }
}
