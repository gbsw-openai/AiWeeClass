import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoomDto } from 'src/dtos/create-room.dto';
import { RoomEntity } from 'src/entities/room.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import * as jwt from "jsonwebtoken";

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(RoomEntity)
        private readonly roomRepository: Repository<RoomEntity>,
        private readonly userService: UserService,
    ) {}

    async createRoom(createRoomDto: CreateRoomDto, token: string): Promise<RoomEntity> {

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
            id: number;
        };

        const userId = await this.userService.getOneUser(decoded.id);
    
        // 유저가 없다면 예외 처리
        if (!userId) {
            throw new NotFoundException('User not found');
        }
    
        const room = await this.roomRepository.save({
            name: createRoomDto.name,
            userId: decoded.id,
          });

          return room;
    }

}
