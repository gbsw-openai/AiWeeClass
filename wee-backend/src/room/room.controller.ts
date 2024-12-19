import { Body, Controller, UseGuards, ValidationPipe, Headers, Post, Get, Param, NotFoundException, Delete, Req, Request} from '@nestjs/common';
import { RoomService } from './room.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateRoomDto } from 'src/dtos/create-room.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createRoom(
    @Headers("authorization") token: string,
    @Body (ValidationPipe)createRoomDto: CreateRoomDto
  ) {
    token = token.replace("Bearer ", "");
    const room = await this.roomService.createRoom(createRoomDto, token);

    return {
      success: true,
      ID: room.id,
      Name: createRoomDto.name,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOneRoom(@Param('id') id: number) {
    const room = await this.roomService.findOneRoom(id)

    if(!room) {
      throw new NotFoundException(`${id}를 가진 방을 찾지 못했습니다`);
    }
    return {
      success: true,
      body: room,
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllRoom() {
      const rooms = await this.roomService.findAllRoom();
      
      return {
        success: true,
        body: rooms,
      }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteRoom(@Param('id') id: number, @Headers("authorization") token: string,) {
    token = token.replace("Bearer ", "");

    await this.roomService.deleteRoom(id, token);

    return {
      success: true,
    }
  }
}
