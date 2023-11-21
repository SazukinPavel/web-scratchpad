import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@ObjectType()
@Schema({timestamps:true})
export class Note {
  @Field()
  id: string;

  @Field()
  @Prop({ required: true })
  title?: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;

  @Field()
  @Prop()
  createdAt: string;

  @Field()
  @Prop()
  updatedAt: string;
}

export type NoteDocument = HydratedDocument<Note>;

export const NoteSchema = SchemaFactory.createForClass(Note);
