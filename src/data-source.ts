import { DataSource, DataSourceOptions } from 'typeorm';
import { Admin } from './database/models/admin.model';
import { SeederOptions } from 'typeorm-extension';
import { MainSeeder } from './seeders/main.seeder';

const options: DataSourceOptions & SeederOptions = {
   type: 'mysql',
   host: 'mysql',
   port: 3306,
   username: 'root',
   password: 'root',
   database: 'blogdb',
   logging: false,
   synchronize: false,
   entities: [Admin],
   seeds: [MainSeeder],
   connectTimeout: 60 * 60 * 1000,
};

export const appDataSource = new DataSource(options);
