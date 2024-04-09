import { createParamDecorator, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

export const AuthUserId = createParamDecorator(
  (data, req) => req.args[0].user.id as string,
);
