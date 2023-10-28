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

  @Get('generate-text')
  async generateText(@Body('input') input: string): Promise<string> {
    return this.googleAIService.generateText(input);
  }
}


