import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const env = process.env.NODE_ENV || 'local';
const whitelist = [];
if (env === 'prod') {
  whitelist.push('https://creditu-players-assessment-ui.herokuapp.com');
} else {
  whitelist.push(/http:\/\/localhost:[0-9]+$/);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({ origin: whitelist });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
