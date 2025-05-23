import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 없는 속성 제거
      forbidNonWhitelisted: true, // DTO에 없는 속성 있으면 에러 발생
      transform: true, // 요청 객체 자동 변환 (string -> number 등)
      errorHttpStatusCode: 400,
    }),
  );

  await app.listen(process.env.PORT ?? 3002);
}

bootstrap();
