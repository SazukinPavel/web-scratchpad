import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from 'src/models/note.model';
import { AddNoteInput } from './dto/add-note.input';
import { UpdateNoteInput } from './dto/update-note.input';
import { User } from 'src/models/user.model';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  async create(addNoteInput: AddNoteInput, user: User): Promise<Note> {
    return this.noteModel.create({
      ...addNoteInput,
      ownerId: user.id,
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

  async findAll(user: User): Promise<Note[]> {
    return this.noteModel
      .find({ ownerId: user.id })
      .sort({ updatedAt: 'desc' });
  }

  async findOne(id: string, user: User): Promise<Note> {
    const note = await this.noteModel.findById(id);

    if (!note || note.ownerId !== user.id) {
      throw new NotFoundException(`Note with id ${id} not exist`);
    }

    return note;
  }
}
