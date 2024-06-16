import { PostRepository } from '../database/repositories/post.repository';
import { PostService } from '../services/post.service';

export class PostFactory {
   private static serviceInstance: PostService;

   public static getServiceInstance(): PostService {
      if (this.serviceInstance) {
         return this.serviceInstance;
      }

      const postRepository = new PostRepository();
      const postService = new PostService(postRepository);

      this.serviceInstance = postService;

      return postService;
   }
}
