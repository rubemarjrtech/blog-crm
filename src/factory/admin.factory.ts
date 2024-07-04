import { AdminRepository } from '../database/repositories/admin.repository';
import { AdminService } from '../services/admin.service';

export default class AdminFactory {
   private static adminService: AdminService;

   public static getAdminService(): AdminService {
      if (this.adminService) {
         return this.adminService;
      }

      const adminRepository = new AdminRepository();
      const adminService = new AdminService(adminRepository);

      this.adminService = adminService;

      return adminService;
   }
}
