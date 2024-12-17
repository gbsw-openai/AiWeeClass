import { PickType } from "@nestjs/swagger";
import { RoomEntity } from "src/entities/room.entity";

export class CreateRoomDto extends PickType(RoomEntity, [
    'name',
    'userId',
]) {}