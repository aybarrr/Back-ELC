import { Controller, Get, Body, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GoogleAIService } from './googleAi.service';
import { AiLessonsService } from './AiLessons.service';


@Controller('lessons')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post(':lessonNum')
  sendMessage(
    @Param('lessonNum') lesson: number,
    @Body('input') input: string
  ) {
    return this.appService.sendMessage(lesson, input);
  }
}

@Controller('ai-tense')
export class AiController {
  constructor(private readonly googleAIService: GoogleAIService) {}

  @Post('define-tense')

async generateText(@Body('input') input: Object): Promise<string> {
  console.log(`input to controller: ${typeof(input)}`);

  return this.googleAIService.generateText(JSON.stringify(input));
  }
} 

@Controller('ai-lessons')
export class AiLessonsController {
  constructor(private readonly googleAIService: GoogleAIService, private aiLessonsService: AiLessonsService) {}

  @Post(':lessonNum')
  async sendMessage(
    @Param('lessonNum') lesson: number,
    @Body('input') input: string
  ) {
     
    const prompt = this.aiLessonsService.createFunction(lesson, input);
    return await this.googleAIService.generateTextWithCustomPrompt(input, prompt);
  }
}


  
