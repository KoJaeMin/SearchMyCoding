import session from "express-session";
import 'dotenv/config';
import { ConfigService } from "@nestjs/config";

const config : ConfigService = new ConfigService();

export const sessionOption : session.SessionOptions = {
    secret : config.get<string>('SESSION_SECRET'),
    resave : false,
    saveUninitialized : true,
    cookie : {
        httpOnly: true,
        maxAge : 60000
    }
}