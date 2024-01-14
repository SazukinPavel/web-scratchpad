import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateTopicInput {
  @Field()
  title: string;

  @Field()
  id: string;
}
