import { DocumentBuilder } from '@nestjs/swagger';

export const SwaggerConfig = new DocumentBuilder()
    .setTitle('Question API')
    .setDescription('Question API description')
    .setVersion('0.0.1')
    .addTag('Question')
    .build();