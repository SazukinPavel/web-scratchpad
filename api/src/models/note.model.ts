import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Topic } from './topic.model';

@ObjectType()
@Schema({ timestamps: true })
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
  @Prop({ required: true })
  ownerId: string;

  @Field()
  @Prop()
  createdAt: Date;

  @Field()
  @Prop({ type: Types.ObjectId, ref: 'Topic' })
  topic: Topic

  @Field()
  @Prop()
  updatedAt: Date;
}

export type NoteDocument = HydratedDocument<Note>;

export const NoteSchema = SchemaFactory.createForClass(Note);
