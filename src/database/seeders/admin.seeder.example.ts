import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Admin } from '../../database/models/admin.model';
import bcrypt from 'bcrypt';

export class AdminSeeder implements Seeder {
   async run(dataSource: DataSource): Promise<void> {
      const adminRepository = dataSource.getRepository(Admin);

      const adminData = {
         username: '',
         password: await bcrypt.hash('', 10),
      };

      const alreadyExists = await adminRepository.findOne({
         where: {
            username: adminData.username,
         },
      });

      if (!alreadyExists) {
         const newAdmin = adminRepository.create(adminData);

         await adminRepository.save(newAdmin);
      }
   }
}
