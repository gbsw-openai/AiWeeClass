import { Body, Controller,Get, Param,UseGuards, ValidationPipe, Headers, Post} from '@nestjs/common';
import { RoomService } from './room.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateRoomDto } from 'src/dtos/create-room.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  public async createRoom(
    @Headers("authorization") token: string,
    @Body (ValidationPipe)createRoomDto: CreateRoomDto
  ) {
    token = token.replace("Bearer ", "");
    const room = await this.roomService.createRoom(createRoomDto, token);

    return {
      success: true,
      ID: room.id,
    };
  }
}
