import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from 'src/entities/message.entity';
import { OpenAiService } from './openai.service';
import { OpenAiController } from './openai.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  providers: [OpenAiService],
  controllers: [OpenAiController]
})
export class OpenaiModule {}
