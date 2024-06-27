import { setSeederFactory } from 'typeorm-extension';
import { Comment } from '../../database/models/comment.model';
import { Faker } from '@faker-js/faker';

export default setSeederFactory(Comment, (faker: Faker) => {
   const comment = new Comment();

   comment.name = faker.person.fullName();
   comment.comment = faker.lorem.text();
   comment.email = faker.internet.email();
   comment.url = faker.internet.url();

   return comment;
});
