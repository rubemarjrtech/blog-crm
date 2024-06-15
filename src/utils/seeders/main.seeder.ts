import { DataSource } from 'typeorm';
import { Seeder, runSeeder } from 'typeorm-extension';
import { AdminSeeder } from './admin.seeder';
import { MemberSeeder } from './member.seeder';

export class MainSeeder implements Seeder {
   async run(dataSource: DataSource): Promise<void> {
      await runSeeder(dataSource, AdminSeeder);
      await runSeeder(dataSource, MemberSeeder);
   }
}
