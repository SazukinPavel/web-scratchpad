import { ExecutionContext } from "@nestjs/common";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";

export default function (context: ExecutionContext) {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest()
  } else if (context.getType<GqlContextType>() === 'graphql') {
    return GqlExecutionContext.create(context).getContext().req
  }
}