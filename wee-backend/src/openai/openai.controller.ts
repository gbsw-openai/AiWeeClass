import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { OpenAiService } from "./openai.service";
import { MessageEntity } from "src/entities/message.entity";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { CreateMessageDto } from "src/dtos/create-messge.dto";

@Controller('chat')
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async createChat(
    @Body() createmessagedto: CreateMessageDto): Promise<MessageEntity> {
    const chat = await this.openAiService.chat(createmessagedto);

    return chat;
  }
}
