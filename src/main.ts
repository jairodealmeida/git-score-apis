import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS and other security features
  app.enableCors();

  // Configure Swagger
  const options = new DocumentBuilder()
    .setTitle('GIT ScoreAPI')
    .setDescription('API to git score controll from developer team')
    .setVersion('1.0')
    .addTag('commit')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
