import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {ImATeapotExceptionFilter} from "./filters/im-a-teapot-exception.filter";
import {GlobalExceptionFilter} from "./filters/global-exception.filter";
import * as cookieParser from "cookie-parser"
import {NestExpressApplication} from "@nestjs/platform-express";
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });
  // (app as NestExpressApplication).use(helmet());
  app.use(cookieParser())
  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    }
  }));
  // app.useGlobalFilters(new ImATeapotExceptionFilter(), new GlobalExceptionFilter());
  await app.listen(3000);
}
bootstrap();
