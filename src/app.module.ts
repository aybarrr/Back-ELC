import { Module } from '@nestjs/common';
import { AiController, AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleAIService } from './googleAi.service';

@Module({
  imports: [],
  controllers: [AppController, AiController],
  providers: [AppService, GoogleAIService],
})
export class AppModule {}
