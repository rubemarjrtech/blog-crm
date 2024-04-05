import { DataSource } from 'typeorm';
import { Seeder, runSeeder, SeederFactoryManager } from 'typeorm-extension';
import { AdminSeeder } from './admin.seeder';
import { MemberSeeder } from './member.seeder';
import { Post } from '../../database/models/post.model';
import { faker } from '@faker-js/faker';
export class MainSeeder implements Seeder {
   async run(
      dataSource: DataSource,
      factoryManager: SeederFactoryManager,
   ): Promise<void> {
      await runSeeder(dataSource, AdminSeeder);
      await runSeeder(dataSource, MemberSeeder);

      const postRepository = dataSource.getRepository(Post);

      const postFactory = factoryManager.get(Post);

      const members = [1];

      const posts = await Promise.all(
         Array(40)
            .fill('')
            .map(async () => {
               const made = await postFactory.make({
                  member_id: faker.helpers.arrayElement(members),
               });
               return made;
            }),
      );
      await postRepository.save(posts);
   }
}
