import 'reflect-metadata';
import { appDataSource } from './data-source';
import app from './app';

const PORT = 4000;

appDataSource
   .initialize()
   .then(() => {
      console.log('Connection with database established');

      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   })
   .catch((err) => {
      console.log('Connection with database failed');
      console.log(err);
   });
