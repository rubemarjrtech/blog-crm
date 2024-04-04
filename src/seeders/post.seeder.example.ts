import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Post } from '../database/models/post.model';

export class PostSeeder implements Seeder {
   async run(dataSource: DataSource): Promise<void> {
      const postRepository = dataSource.getRepository(Post);

      const userData = {
         title: '',
         body: '',
         member_id: 0,
      };

      const newAdmin = postRepository.create(userData);

      await postRepository.save(newAdmin);
   }
}
