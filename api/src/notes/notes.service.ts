import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from 'src/models/note.model';
import { AddNoteInput } from './dto/add-note.input';
import { UpdateNoteInput } from './dto/update-note.input';

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

    await this.noteModel.findByIdAndDelete(id);

    return true;
  }

  async update({ id, ...data }: UpdateNoteInput) {
    await this.findOne(id);

    await this.noteModel.findByIdAndUpdate(id, { ...data });

    return this.findOne(id);
  }

  async findAll(): Promise<Note[]> {
    return this.noteModel.find();
  }

  async findOne(id: string): Promise<Note> {
    const note = await this.noteModel.findById(id);

    if (!note) {
      throw new NotFoundException(`Note with id ${id} not exist`);
    }

    return note;
  }
}
