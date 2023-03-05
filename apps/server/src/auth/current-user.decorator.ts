import { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user;
  },
);
