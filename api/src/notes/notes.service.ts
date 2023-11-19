import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from 'src/models/note.model';
import { AddNoteInput } from './dto/add-note.input';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  async create(addNoteInput: AddNoteInput): Promise<Note> {
    return await this.noteModel.create({
      ...addNoteInput,
    });
  }

  async delete(id: string): Promise<Boolean> {
    await this.findOne(id);

    await this.noteModel.deleteOne({
      id,
    });

    return true;
  }

  async findAll(): Promise<Note[]> {
    return this.noteModel.find().exec();
  }

  async findOne(id: string): Promise<Note> {
    const note = this.noteModel.findById(id).exec();

    if (!note) {
      throw new NotFoundException();
    }

    return note;
  }
}
