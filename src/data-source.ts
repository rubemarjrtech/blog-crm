import { DataSource } from 'typeorm';
import 'reflect-metadata';

export const appDataSource = new DataSource({
   type: 'mysql',
   host: 'mysql',
   port: 3306,
   username: 'blog',
   password: 'blog',
   database: 'blogdb',
   logging: true,
   synchronize: false,
   connectTimeout: 60 * 60 * 1000,
});
