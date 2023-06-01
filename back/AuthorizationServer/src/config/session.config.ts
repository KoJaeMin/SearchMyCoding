import session from "express-session";
import 'dotenv/config';
import { ConfigService } from "@nestjs/config";
import * as RedisStore from "connect-redis";
import { Redis } from "ioredis";

const config : ConfigService = new ConfigService();

const clientOptions = new Redis({
    host : config.get<string>('REDIS_HOST'),
    port : config.get<number>('REDIS_PORT'),
    tls : {
        timeout : 60
    }
});

export const sessionOption : session.SessionOptions = {
    secret : config.get<string>('SESSION_SECRET'),
    resave : false,
    saveUninitialized : true,
    cookie : {
        httpOnly: true,
        maxAge : 60000 /// 단위는 ms
    },
    store : new (RedisStore(session))({
        client : clientOptions,
        ttl : 60 /// 단위 s
    })
}