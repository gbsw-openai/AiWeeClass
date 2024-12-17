import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from 'src/dtos/user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async createUser(userDTO: UserDTO): Promise<UserEntity> {
        
        const hashedPassword = await hash(userDTO.password, 10); 

        const newUser = this.userRepository.create({
            email: userDTO.email,
            password: hashedPassword,
        });

        return this.userRepository.save(newUser);
    }
}
