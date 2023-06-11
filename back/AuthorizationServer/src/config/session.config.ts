import session from "express-session";
import 'dotenv/config';
import { ConfigService } from "@nestjs/config";
import * as connectRedis from 'connect-redis';
import { Redis } from "ioredis";

const config : ConfigService = new ConfigService();

const RedisStore = connectRedis(session);

const clientOptions = new Redis({
    host : config.get<string>('REDIS_HOST'),
    port : config.get<number>('REDIS_PORT')
});

export const sessionOption : session.SessionOptions = {
    secret : config.get<string>('SESSION_SECRET'),
    resave : false,
    saveUninitialized : false,
    cookie : {
        httpOnly: true,
        maxAge : 60000 /// 단위는 ms
    },
    store : new RedisStore({
        client : clientOptions,
        ttl : 60
    })
}