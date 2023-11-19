import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Note } from 'src/models/note.model';
import { AddNoteInput } from './dto/add-note.input';

@Resolver((of) => Note)
export class NoteResolver {
  constructor() {}

  notes: Note[] = [
    { title: 'test', description: 'test', id: 1 },
    { title: 'test', description: 'test', id: 2 },
    { title: 'test', description: 'test', id: 3 },
  ];

  @Query((returns) => Note)
  async one(@Args('id', { type: () => Int }) id: number) {
    return this.notes.find((n) => n.id === id);
  }

  @Query((returns) => [Note])
  async list() {
    return this.notes;
  }

  @Mutation((returns) => Note)
  async addNote(@Args('addNoteInput') addNoteInput: AddNoteInput) {
    this.notes.push({ ...addNoteInput, id: this.notes.length + 1 });
    return this.notes[this.notes.length - 1];
  }
}
