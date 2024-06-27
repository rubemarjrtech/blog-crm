import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Post } from '../../database/models/post.model';
import { faker } from '@faker-js/faker';
import { Member } from '../../database/models/member.model';

export class PostSeeder implements Seeder {
   async run(
      dataSource: DataSource,
      factoryManager: SeederFactoryManager,
   ): Promise<void> {
      const postRepository = dataSource.getRepository(Post);
      const memberRepository = dataSource.getRepository(Member);

      const memberIds: number[] = await memberRepository
         .createQueryBuilder('members')
         .select(['id'])
         .distinct(true)
         .getRawMany();

      const postFactory = factoryManager.get(Post);

      const posts = await Promise.all(
         Array(60) // Or any other number you would like to test pagination with
            .fill('')
            .map(async () => {
               const made = await postFactory.make({
                  memberId: faker.helpers.arrayElement(memberIds),
               });
               return made;
            }),
      );

      await postRepository.save(posts);
   }
}
