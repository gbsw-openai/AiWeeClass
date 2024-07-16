import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from 'src/dtos/user.dto';
import { UserEntity } from 'src/entities/user.entity';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(@Body() userDTO: UserDTO): Promise<UserEntity>{
    const createdUser = await this.userService.createUser(userDTO);

    return createdUser;
  }
}
