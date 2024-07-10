import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserDTO } from 'src/dtos/user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async logIn(@Body() userDTO: UserDTO){
    const loginUser = await this.authService.logIn(userDTO);

    return loginUser;
  }
}
