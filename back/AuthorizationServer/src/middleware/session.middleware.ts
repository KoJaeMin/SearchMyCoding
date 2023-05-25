import session from "express-session";
import { sessionOption } from "src/config/session.config";

export const SessionMiddleware = session(sessionOption);