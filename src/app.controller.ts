import { Controller, Get, Body, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GoogleAIService } from './googleAi.service';

@Controller('lessons')
export class AppController {
  constructor(private readonly appService: AppService, private readonly googleAIService: GoogleAIService) {}

  @Post(':lessonNum')
  sendMessage(
    @Param('lessonNum') lesson: number,
    @Body('input') input: string
  ) {
    return this.appService.sendMessage(lesson, input);
  }

 
}

@Controller('ai-gen')
export class AiController {
  constructor(private readonly appService: AppService, private readonly googleAIService: GoogleAIService) {}

  @Post('define-tense')
async generateText(@Body('input') input: string): Promise<object> {
  const data = { tense: this.googleAIService.generateText(input)};
  return data;
}

 
}

