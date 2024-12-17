import { PickType } from "@nestjs/swagger";
import { UserEntity } from "src/entities/user.entity";

export class UserDTO extends PickType(UserEntity, [
    'password',
    'email',
]) {}