export interface PostProps {
   title: string;
   body: string;
   thumbnail?: string;
}

export class PostEntity {
   title: string;
   body: string;
   thumbnail?: string;

   constructor({ title, body, thumbnail }: PostProps) {
      this.title = title;
      this.body = body;
      this.thumbnail = thumbnail;
   }
}
