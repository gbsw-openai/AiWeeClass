import * as path from 'path';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mysql',  // 어떤 DB를 사용할 것인지
  host: 'localhost',
  port: 3306,
  database: 'openai',
  username: 'root',
  password: '0000',
  entities: [
    path.join(__dirname, 'src/entities/**/*.entity.ts'),
    path.join(__dirname, 'dist/entities/**/*.entity.js'),
  ],
  synchronize: false,
  logging: true,
});