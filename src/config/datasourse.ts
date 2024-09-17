import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false,
  logging: true,
  // entities: ['models/**/*.ts'],
  migrations: ['dist/src/migration/**/*.js'],
  // subscribers: ['subscriber/**/*.ts'],
});

export default dataSource;