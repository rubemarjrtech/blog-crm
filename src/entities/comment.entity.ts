export interface CommentTypes {
   name: string;
   email?: string;
   url?: string;
   comment: string;
   postId: number;
}

export class CommentEntity {
   name: string;
   email?: string;
   url?: string;
   comment: string;
   postId: number;

   constructor({ name, email, url, comment, postId }: CommentTypes) {
      this.name = name;
      this.email = email;
      this.url = url;
      this.comment = comment;
      this.postId = postId;
   }
}
