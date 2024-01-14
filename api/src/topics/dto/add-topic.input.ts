import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddTopicInput {
  @Field()
  title: string;
}
