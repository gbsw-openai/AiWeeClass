import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/dtos/user.dto';
import { Response } from 'express'; // Response 임포트 추가
import { InternalServerError } from 'openai';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userDTO: UserDTO) {
    const { password, email } = userDTO;
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
      createdAt: user.createdAt,
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
}
