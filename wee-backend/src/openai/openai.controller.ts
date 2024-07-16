import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorators';
import { CreateChatDto } from 'src/dtos/create-chat-dto';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/chat')
  async chat(@Body() body: CreateChatDto, @User() user) {
    const message = body.message;
    const aiResponse = body.aiResponse;

    const userId = user.id;

    // OpenaiService의 chat 메서드 호출
    const result = await this.openaiService.chat(message, aiResponse, userId);

    // AI 응답과 함께 메시지의 id와 createdAt을 클라이언트에게 반환
    return result;
  }
}
