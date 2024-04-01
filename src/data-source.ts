import { DataSource, DataSourceOptions } from 'typeorm';
import { Admin } from './database/models/admin.model';
import { SeederOptions } from 'typeorm-extension';
import { MainSeeder } from './seeders/main.seeder';
import { Image } from './database/models/image.model';
import { Post } from './database/models/post.model';
import { Member } from './database/models/member.model';
import { Comment } from './database/models/comment.model';
import 'dotenv/config';

const port = process.env.DB_PORT as number | undefined;

const options: DataSourceOptions & SeederOptions = {
   type: 'mysql',
   host: process.env.DB_HOST,
   port,
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DATABASE,
   synchronize: true,
   entities: [Admin, Image, Post, Member, Comment],
   seeds: [MainSeeder],
   connectTimeout: 60 * 60 * 1000,
};

export const appDataSource = new DataSource(options);
