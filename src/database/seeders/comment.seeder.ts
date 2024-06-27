import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Comment } from '../../database/models/comment.model';
import { Post } from '../../database/models/post.model';
import { faker } from '@faker-js/faker';

export class CommentSeeder implements Seeder {
   async run(
      dataSource: DataSource,
      factoryManager: SeederFactoryManager,
   ): Promise<void> {
      const commentRepository = dataSource.getRepository(Comment);
      const postRepository = dataSource.getRepository(Post);

      const postIds: number[] = await postRepository
         .createQueryBuilder('posts')
         .select(['id'])
         .distinct(true)
         .getRawMany();

      const commentFactory = factoryManager.get(Comment);

      const comments = await Promise.all(
         Array(500)
            .fill('')
            .map(async () => {
               const comment = await commentFactory.make({
                  postId: faker.helpers.arrayElement(postIds),
               });

               return comment;
            }),
      );

      await commentRepository.save(comments);
   }
}
