import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from 'src/entities/message.entity';
import { RoomEntity } from 'src/entities/room.entity';
import { UserEntity } from 'src/entities/user.entity';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { UserService } from 'src/user/user.service';
import { OpenAiService } from 'src/openai/openai.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, RoomEntity, UserEntity])],
  providers: [RoomService, UserService, OpenAiService, AuthService, JwtService],
  controllers: [RoomController]
})
export class RoomModule {}
