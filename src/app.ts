import express, { Application, json } from 'express';
import { router } from './routes';
import { resolve } from 'path';
import cors from 'cors';

class App {
   public app: Application;

   constructor() {
      this.app = express();
      this.middlewares();
      this.router();
   }

   private middlewares(): void {
      this.app.use(json());
      this.app.use(
         '/uploads',
         express.static(resolve(__dirname, '..', 'uploads')),
      );
      this.app.use(
         cors({
            origin: process.env.ORIGIN,
            credentials: true,
         }),
      );
   }

   private router(): void {
      this.app.use('/api', router);
   }
}

export default new App().app;
