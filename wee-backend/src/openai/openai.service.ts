import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenaiService {
  private readonly openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
  }

  async chat(message: any): Promise<string> {
    const chatCompletion = await this.openai.chat.completions.create({
      messages: [message],
      model: this.configService.get('OPENAI_API_MODEL'),
    });

    const finalAnswer: string[] = [];
    for (const choice of chatCompletion.choices) {
      const chunkContent = choice.message.content;
      if (typeof chunkContent === 'string') {
        finalAnswer.push(chunkContent);
      }
    }
    
    return finalAnswer[finalAnswer.length - 1];
  }
}
