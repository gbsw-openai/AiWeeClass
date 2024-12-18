import { IsString } from "class-validator";

export class CreateMessageDto {
  @IsString()
  userMessage: string;

  @IsString()
  user_id: string;
}