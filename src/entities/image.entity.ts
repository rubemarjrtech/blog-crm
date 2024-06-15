export interface ImageTypes {
   files: Express.Request['files'];
   memberId: number;
}

export class ImageEntity {
   files: Express.Request['files'];
   memberId: number;

   constructor({ files, memberId }: ImageTypes) {
      this.files = files;
      this.memberId = memberId;
   }
}
