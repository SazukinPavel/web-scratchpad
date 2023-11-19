import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Note {
  @Field()
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;
}
