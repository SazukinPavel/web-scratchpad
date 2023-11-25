import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

@Injectable()
export class GqlAuthGuard {
  async canActivate(context: ExecutionContext) {
    const request = GqlExecutionContext.create(context).getContext()
      .req as Request & { user: any };

    return !!request.user;
  }
}
