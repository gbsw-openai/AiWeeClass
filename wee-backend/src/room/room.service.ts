/*import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageEntity } from 'src/entities/message.entity';
import { RoomEntity } from 'src/entities/room.entity';
import { OpenaiService } from 'src/openai/openai.service'; 
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(RoomEntity)
        private readonly roomRepository: Repository<RoomEntity>,
        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>,
        private readonly openAiService: OpenaiService
    ) {}
    async createRoom(userId: string, name: string): Promise<RoomEntity> {
        const user = await this.messageRepository.findOne({ where: { id: userId } });
        if (!user) {
          throw new NotFoundException('User not found');
        }
    
        const room = this.roomRepository.create({
          name,
          user,
        });
        return this.roomRepository.save(room);
      }
    
      async sendMessage(userId: string, roomId: string, message: string, aiResponse: string): Promise<RoomEntity> {
        const user = await this.roomRepository.findOne({ where: { id: userId } });
        if (!user) {
          throw new NotFoundException('User not found');
        }
    
        const findroom = await this.roomRepository.findOne({
          where: { id: roomId },
        });
        if (!findroom) {
          throw new NotFoundException('Room not found');
        }
    
        await this.openAiService.chat(userId, message);
    
        return findroom;
      }
    }*/