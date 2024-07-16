import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from 'src/dtos/user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt'; // bcrypt에서 hash 함수 가져오기

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async createUser(userDTO: UserDTO): Promise<UserEntity> {
        // 비밀번호 해싱
        const hashedPassword = await hash(userDTO.password, 10); // saltRounds는 10으로 설정

        // 새 사용자 엔티티 생성
        const newUser = this.userRepository.create({
            email: userDTO.email,
            password: hashedPassword, // 해싱된 비밀번호 저장
        });

        // 사용자 저장 및 반환
        return this.userRepository.save(newUser);
    }
}
