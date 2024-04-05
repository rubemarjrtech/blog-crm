import 'reflect-metadata';
import express, { json } from 'express';
import { router } from './routes';
import { appDataSource } from './data-source';

const app = express();
const PORT = 3000;

app.use(json());
app.use(router);

appDataSource
   .initialize()
   .then(() => {
      console.log('Connection with database established');

      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   })
   .catch((err) => {
      console.log(err);
   });
