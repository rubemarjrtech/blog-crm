import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Post } from '../database/models/post.model';

export class PostSeeder implements Seeder {
   async run(dataSource: DataSource): Promise<void> {
      const postRepository = dataSource.getRepository(Post);

      const userData = {
         title: 'teste',
         body: 'testetesteteste',
         member_id: 1,
      };

      const newAdmin = postRepository.create(userData);

      await postRepository.save(newAdmin);
   }
}
