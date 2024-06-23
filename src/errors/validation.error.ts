export class AppError {
   message: string | string[];
   code: number;

   constructor(message: string | string[], code: number) {
      this.message = message;
      this.code = code;
   }
}
