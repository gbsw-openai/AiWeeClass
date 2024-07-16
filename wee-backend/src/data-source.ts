import * as path from 'path';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { UserEntity } from './entities/user.entity';
import { RoomEntity } from './entities/room.entity';
import { CommonBigPKEntity } from './entities/common.entity';
import { MessageEntity } from './entities/message.entity';

dotenv.config();

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entities: [UserEntity, RoomEntity, CommonBigPKEntity, MessageEntity],
  synchronize: false,
  logging: true,
});