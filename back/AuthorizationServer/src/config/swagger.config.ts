import { DocumentBuilder } from '@nestjs/swagger';

export const SwaggerConfig = new DocumentBuilder()
    .setTitle('Authorization API')
    .setDescription('Authorization API description')
    .setVersion('0.0.1')
    .build();