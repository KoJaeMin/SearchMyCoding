import { DocumentBuilder } from '@nestjs/swagger';

export const SwaggerConfig = new DocumentBuilder()
    .setTitle('SearchMyCoding API')
    .setDescription('The SearchMyCoding API description')
    .setVersion('0.0')
    .addTag('mbti')
    .build();