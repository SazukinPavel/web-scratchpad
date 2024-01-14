import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Topic {
    @Field()
    id: string;

    @Field()
    @Prop({ required: true })
    title?: string;

    @Field()
    @Prop()
    createdAt: Date;

    @Field()
    @Prop({ required: true })
    ownerId: string;

    @Field()
    @Prop()
    updatedAt: Date;
}

export type TopicDocument = HydratedDocument<Topic>;

export const TopicSchema = SchemaFactory.createForClass(Topic);
