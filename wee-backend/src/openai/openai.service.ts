import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from 'src/entities/message.entity';

@Injectable()
export class OpenAiService {
  private readonly openai: OpenAI;
  private readonly prompt: string;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {
    this.openai = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
    this.prompt = this.configService.get('OPENAI_PROMPT');
  }

  async chat(createmessagedto): Promise<MessageEntity> {
    const {userMessage, userId} = createmessagedto;
    const chatCompletion = await this.openai.chat.completions.create({
      model: this.configService.get('OPENAI_API_MODEL'),
      messages: [
        { role: 'system', content: this.prompt },
        { role: 'user', content: userMessage},
      ],
      max_tokens: 500,
      temperature: 0.4,
    });

    const aiResponse = chatCompletion.choices[0].message.content;

    const counsel = this.messageRepository.create({
      aiResponse: aiResponse,
      userId: userId,
      userMessage: userMessage,
    });

    return await this.messageRepository.save(counsel);
  }
}
