import { setSeederFactory } from 'typeorm-extension';
import { Post } from '../../database/models/post.model';
import { Faker } from '@faker-js/faker';

export default setSeederFactory(Post, (faker: Faker) => {
   const post = new Post();
   post.title = faker.lorem.sentence();
   post.body = faker.lorem.words(60);
   post.thumbnail = faker.internet.url();

   return post;
});
