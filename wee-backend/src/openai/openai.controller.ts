import { Controller, Post, Body } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('/chat')
  async chat(@Body('message') message: any): Promise<string> {
    const response = await this.openaiService.chat(message);
    console.log('OpenAI Response:', response);
    return response;
  }
}
