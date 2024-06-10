export interface PostTypes {
   title: string;
   body: string;
   thumbnail?: string;
   memberId: number;
}

export class PostEntity {
   title: string;
   body: string;
   thumbnail?: string;
   memberId: number;

   constructor({ title, body, thumbnail, memberId }: PostTypes) {
      this.title = title;
      this.body = body;
      this.thumbnail = thumbnail;
      this.memberId = memberId;
   }
}
