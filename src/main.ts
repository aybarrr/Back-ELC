import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:5500/main.html'
    ],
    methods: ["GET", "POST"],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
