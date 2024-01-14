import { Module } from '@nestjs/common';
import { TopicsResolver } from './topics.resolver';
import { TopicsService } from './topics.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Topic, TopicSchema } from 'src/models/topic.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Topic.name, schema: TopicSchema }]),
  ],
  exports: [TopicsService],
  providers: [TopicsResolver, TopicsService]
})
export class TopicsModule { }
