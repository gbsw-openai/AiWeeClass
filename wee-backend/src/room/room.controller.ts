import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorators';
import { CreateRoomDto } from 'src/dtos/create-room.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.createRoom(createRoomDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getOneRoom(@Param('id') id: number) {
    return await this.roomService.getOneRoom(id);
  }

  @Get()
  async findAll() {
    return await this.roomService.getAllRooms();
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteRoom(@Param('id') id: number, @User() user: any) {
    const userId = user.id;
    return await this.roomService.deleteRoom(id, userId);
  }
}
