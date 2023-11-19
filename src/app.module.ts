import { Module } from '@nestjs/common';
import { AiController, AiLessonsController, AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleAIService } from './googleAi.service';
import { AiLessonsService } from './AiLessons.service';


@Module({
  imports: [],
  controllers: [AppController, AiController, AiLessonsController],
  providers: [AppService, GoogleAIService, AiLessonsService],
})
export class AppModule {}
