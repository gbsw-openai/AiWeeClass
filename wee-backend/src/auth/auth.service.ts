import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dtos/user.dto';
import { Response } from 'express'; 
import * as jwt from 'jsonwebtoken'; // jwt 패키지 사용
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new BadRequestException('이메일이 잘못되었습니다.');
    }

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }

    return {
      id: user.id,
      email: user.email,
    };
  }

  async logIn(user, res: Response) {
    try{
    const accessToken = this.jwtService.sign(user);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 //1 day
      });
    } catch(error) {
        throw new InternalServerErrorException('로그인 도중 오류가 발생했습니다');
    }
  }

  async decodeToken(token: string) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { 
      id: number 
    }; 

    const user = await this.userService.getOneUser(decoded.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: decoded.id,
    };
  }
}
