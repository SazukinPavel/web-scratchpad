import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Topic } from 'src/models/topic.model';
import { AddTopicInput } from './dto/add-topic.input';
import { User } from 'src/models/user.model';
import { UpdateTopicInput } from './dto/update-topic.input';

@Injectable()
export class TopicsService {
    constructor(@InjectModel(Topic.name) private topicModel: Model<Topic>) { }

    create(addTopicInput: AddTopicInput, user: User): Promise<Topic> {
        return this.topicModel.create({
            ...addTopicInput,
            ownerId: user.id,
        });
    }

    async delete(id: string, user: User): Promise<Boolean> {
        await this.findOneById(id, user);

        await this.topicModel.findByIdAndDelete(id);

        return true;
    }

    async update({ id, ...data }: UpdateTopicInput, user: User) {
        await this.findOneById(id, user);

        await this.topicModel.findByIdAndUpdate(id, { ...data });

        return this.findOneById(id, user);
    }

    findAll(user: User): Promise<Topic[]> {
        return this.topicModel
            .find({ ownerId: user.id })
            .sort({ updatedAt: 'desc' });
    }

    async findOneById(id: string, user: User): Promise<Topic> {
        const topic = await this.topicModel.findById(id);

        if (!topic || topic.ownerId !== user.id) {
            throw new NotFoundException(`Topic with id ${id} not exist`);
        }

        return topic;
    }

    async findOneByTitle(title: string, user: User): Promise<Topic> {
        const topic = await this.topicModel.findOne({ title, ownerId: user.id });

        if (!topic) {
            throw new NotFoundException(`Topic with title ${title} not exist`);
        }

        return topic;
    }

    async findOrCreate(title: string, user: User) {
        const existedTopic = await this.topicModel.findOne({ title, ownerId: user.id })

        if (existedTopic) {
            return existedTopic
        }

        return this.create({ title }, user)
    }
}
