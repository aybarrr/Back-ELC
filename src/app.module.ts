import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleAIService } from './googleAi.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, GoogleAIService],
})
export class AppModule {}
