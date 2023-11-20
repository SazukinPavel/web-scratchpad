import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateNoteInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  id: string;
}
