import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from 'src/models/note.model';
import { AddNoteInput } from './dto/add-note.input';
import { UpdateNoteInput } from './dto/update-note.input';
import { User } from 'src/models/user.model';
import { TopicsService } from 'src/topics/topics.service';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>,
    private topicsService: TopicsService) { }

  async create(addNoteInput: AddNoteInput, user: User): Promise<Note> {
    const topic = await this.topicsService.findOrCreate(addNoteInput.topic, user)

    return this.noteModel.create({
      ...addNoteInput,
      ownerId: user.id,
      topic
    });
  }

  async delete(id: string, user: User): Promise<Boolean> {
    await this.findOne(id, user);

    await this.noteModel.findByIdAndDelete(id);

    return true;
  }

  async update({ id, ...data }: UpdateNoteInput, user: User) {
    await this.findOne(id, user);

    await this.noteModel.findByIdAndUpdate(id, { ...data });

    return this.findOne(id, user);
  }

  findAll(user: User, params = {}): Promise<Note[]> {
    return this.noteModel
      .find({ ...params, ownerId: user.id })
      .populate('topic')
      .sort({ updatedAt: 'desc' });
  }

  async findAllByTopic(topic: string, user: User) {
    const realTopic = await this.topicsService.findOneByTitle(topic, user)

    return this.findAll(user, { topic: (realTopic as any)._id })
  }

  async findOne(id: string, user: User): Promise<Note> {
    const note = await this.noteModel.findById(id).populate('topic');

    if (!note || note.ownerId !== user.id) {
      throw new NotFoundException(`Note with id ${id} not exist`);
    }

    return note;
  }
}
