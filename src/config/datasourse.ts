import { DataSource } from 'typeorm';
import User from '../models/user.js';
import Article from '../models/article.js';
import Image from '../models/image.js';
import Visitor from '../models/visitor.js';

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false,
  logging: true,
  entities: [ User, Article, Image, Visitor ],
  migrations: ['dist/src/migration/**/*.js'],
  // subscribers: ['subscriber/**/*.ts'],
});

export default dataSource;