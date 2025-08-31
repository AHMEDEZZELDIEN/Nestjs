import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that do not have any decorators
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
      transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
      stopAtFirstError: true, // Stop validation on the first error for each property
      skipMissingProperties: false, // Don't skip validation of missing properties
      forbidUnknownValues: true, // Forbid unknown objects
    }),
  );
  
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
