import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoomDto } from 'src/dtos/create-room.dto';
import { MessageEntity } from 'src/entities/message.entity';
import { RoomEntity } from 'src/entities/room.entity';
import { OpenAiService } from 'src/openai/openai.service';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(RoomEntity)
        private readonly roomRepository: Repository<RoomEntity>,
        @InjectRepository(MessageEntity)
        private readonly openAiService: OpenAiService,
    ) {}

    async createRoom(createRoomDto: CreateRoomDto): Promise<RoomEntity> {
        const {name, userId} = createRoomDto;

        const user = await this.roomRepository.findOne({
            where: { userId },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const newRoom = this.roomRepository.create({
            name,
            userId,
        });

        return await this.roomRepository.save(newRoom);
    }

    async getOneRoom(roomId: number) {

      const getRoom = await this.roomRepository.findOne({ where: { roomId } });

        if (!getRoom) {
            throw new NotFoundException('Room not found');
        }

        return getRoom;
    }

    async getAllRooms(): Promise<RoomEntity[]> {
        return await this.roomRepository.find();
    }

    async deleteRoom(userId: number, roomId: number){
      const room = await this.roomRepository.findOne({ where: { userId } });

      if(!room) {
        throw new NotFoundException('Room not found');
      } else {
        console.log(room);
      }

      return await this.roomRepository.delete({ roomId });
    }
}
