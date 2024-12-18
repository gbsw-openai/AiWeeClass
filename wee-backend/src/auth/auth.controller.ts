import { Body, Controller, Post, Req, UseGuards, Res, Get, BadRequestException, HttpException } from '@nestjs/common';  // Res 추가
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/dtos/user.dto';


@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async logIn(@Body() createUserDTO: CreateUserDto, @Res() res: Response) {
    const user = await this.authService.validateUser(createUserDTO);
    await this.authService.logIn(user, res);
    return res.send({
      message: 'success'
    });
  }

  @Get('/cookies')
  getCookies(@Req() req: Request, @Res() res: Response): any {
    try {
      const jwt = req.cookies['access_token'];
      if (!jwt) {
        throw new BadRequestException('쿠키가 존재하지 않습니다.');
      }
      return res.send(jwt);
    } catch (error) {
      throw new HttpException('쿠키 조회 중 문제가 발생했습니다.', 500);
    }
  }

  @Post('/logout')
  logout(@Req() req: Request, @Res() res: Response): any {
    res.cookie('jwt', '', {
        maxAge: 0
    })
    return res.send({
        message: 'success'
    })
  }
}
