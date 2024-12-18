import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        
        const hashedPassword = await hash(createUserDto.password, 10); 

        const newUser = this.userRepository.create({
            email: createUserDto.email,
            password: hashedPassword,
        });

        return this.userRepository.save(newUser);
    }

    async getOneUser(id: number): Promise<UserEntity> {
        return await this.userRepository.findOne({
          where: {
            id
          }
        })
      }
}
