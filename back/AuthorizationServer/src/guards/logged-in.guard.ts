// auth/logged-in.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class LoggedInGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request : Request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }
}