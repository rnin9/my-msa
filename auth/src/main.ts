// src/main.ts

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 없는 프로퍼티 자동 제거
      forbidNonWhitelisted: true, // 허용하지 않은 프로퍼티가 있으면 에러 발생
      transform: true, // 요청 파라미터를 DTO 클래스로 변환
    }),
  );

  await app.listen(3000);
}

bootstrap();
