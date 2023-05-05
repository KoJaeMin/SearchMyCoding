import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseURI } from './config/mongoose.config';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    }),
    MongooseModule.forRoot(mongooseURI)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
