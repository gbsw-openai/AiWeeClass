import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/dtos/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const createUserDto:  CreateUserDto = { email, password };
    const user = await this.authService.validateUser(createUserDto);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}