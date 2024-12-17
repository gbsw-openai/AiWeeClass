import { PickType } from "@nestjs/swagger";
import { MessageEntity } from "src/entities/message.entity";

export class CreateMessageDto extends PickType(MessageEntity, [
    'userId',
    'userMessage',
]) {}