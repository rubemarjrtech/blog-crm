import { appDataSource } from '../../data-source';
import AuthService from '../../services/auth.service';
import { Admin } from '../models/admin.model';

const adminRepository = appDataSource.getRepository(Admin);

export class AdminRepository {
   constructor(private adminModel = adminRepository) {} // eslint-disable-line

   public async login(
      username: string,
      password: string,
   ): Promise<string | null> {
      const admin = await this.adminModel.findOneBy({ username });

      if (!admin) {
         return null;
      }

      const auth = await AuthService.comparePassword(password, admin.password);

      if (!auth) {
         return null;
      }

      const adminPayload: Partial<Admin> = {
         id: admin.id,
         username: admin.username,
         role: admin.role,
      };

      const adminToken = AuthService.generateToken(adminPayload);

      return adminToken;
   }
}
