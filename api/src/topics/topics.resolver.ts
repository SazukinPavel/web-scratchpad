import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { User } from 'src/models/user.model';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { TopicsService } from './topics.service';
import { AddTopicInput } from './dto/add-topic.input';
import { UpdateTopicInput } from './dto/update-topic.input';
import { Topic } from 'src/models/topic.model';

@Resolver((of) => Topic)
@UseGuards(GqlAuthGuard)
export class TopicsResolver {
    constructor(private readonly topicsService: TopicsService) { }

    @Query((returns) => Topic)
    async oneTopic(
        @Args('id', { type: () => String }) id: string,
        @CurrentUser() user: User,
    ) {
        return this.topicsService.findOneById(id, user);
    }

    @Query((returns) => [Topic])
    async topicsList(@CurrentUser() user: User,) {
        return this.topicsService.findAll(user);
    }

    @Mutation((returns) => Topic)
    async addTopic(@Args('addTopicInput') addTopicInput: AddTopicInput, @CurrentUser() user: User,) {
        return this.topicsService.create(addTopicInput, user);
    }

    @Mutation((returns) => Boolean)
    async deleteTopic(@Args('id', { type: () => String }) id: string, @CurrentUser() user: User,) {
        return this.topicsService.delete(id, user);
    }

    @Mutation((returns) => Topic)
    async updateTopic(@Args('updateTopicInput') updateTopicInput: UpdateTopicInput, @CurrentUser() user: User,) {
        return this.topicsService.update(updateTopicInput, user);
    }
}
