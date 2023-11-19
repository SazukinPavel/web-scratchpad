import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddNoteInput {
  @Field()
  title: string;

  @Field()
  description: string;
}
