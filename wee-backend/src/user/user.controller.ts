import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/dtos/user.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto): Promise<UserEntity>{
    const createdUser = await this.userService.createUser(createUserDto);

    return createdUser;
  }

  @Get(':id')
  async getOneUser(@Param('id') id: number){
    const user = await this.userService.getOneUser(id);

    if (!user) {
      throw new NotFoundException(`${id}를 가진 유저를 찾지 못했습니다`);
    }

    return user;
  }
}
