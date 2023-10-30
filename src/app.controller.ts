import { Controller, Get, Body, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GoogleAIService } from './googleAi.service';
import { stringify } from 'querystring';

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

async generateText(@Body('input') input: Object): Promise<string> {
  console.log(`input to controller: ${typeof(input)}`);

  return this.googleAIService.generateText(JSON.stringify(input));
}
} 

