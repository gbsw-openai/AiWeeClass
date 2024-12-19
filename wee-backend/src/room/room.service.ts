import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoomDto } from 'src/dtos/create-room.dto';
import { RoomEntity } from 'src/entities/room.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(RoomEntity)
        private readonly roomRepository: Repository<RoomEntity>,
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    async createRoom(createRoomDto: CreateRoomDto, token: string): Promise<RoomEntity> {
    
        const decoded = await this.authService.decodeToken(token);

        const room = await this.roomRepository.save({
            name: createRoomDto.name,
            userId: decoded.id
          });

          return room;
    }
    //good
    async findOneRoom(id: number): Promise<RoomEntity> {
        return await this.roomRepository.findOne({
            where: {
                id,
            },
        });
    }

    //good
    async findAllRoom(): Promise<RoomEntity[]> {
        return await this.roomRepository.find();
    }

    async deleteRoom(id: number, token: string): Promise<void> {
       const decoded = await this.authService.decodeToken(token);

       const room = await this.findOneRoom(id);

       if (!room) {
           throw new NotFoundException(`${id}의 id를 가진 방을 찾지 못했습니다`);
       }
   
       if (room.userId !== decoded.id) {
           throw new ForbiddenException('자기 자신의 방만 삭제할 수 있습니다');
       }
   
       // 방 삭제
       await this.roomRepository.delete(id);
    }

    async deleteAllRooms(): Promise<void>{
        await this.roomRepository.delete({});
    }
}
