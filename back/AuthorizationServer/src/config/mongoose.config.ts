import { ConfigService } from '@nestjs/config';
import 'dotenv/config';

const config : ConfigService = new ConfigService();

const type : string = 'mongodb';
const mongodb_host : string = config.get<string>('DATABASE_HOST');
const mongodb_port : number = config.get<number>('DATABASE_PORT');
const mongodb_db : string = config.get<string>('DATABASE_DATABASE');

export const mongooseURI : string = `${type}://${mongodb_host}:${mongodb_port}/${mongodb_db}`;