import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseURI } from './config/mongoose.config';
import { User, UserSchema } from './schemas/user.schema';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    }),
    MongooseModule.forRoot(mongooseURI),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
