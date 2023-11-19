import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Note } from 'src/models/note.model';
import { AddNoteInput } from './dto/add-note.input';
import { NotesService } from './notes.service';

@Resolver((of) => Note)
export class NoteResolver {
  constructor(private readonly notesService: NotesService) {}

  @Query((returns) => Note)
  async one(@Args('id', { type: () => String }) id: string) {
    return this.notesService.findOne(id);
  }

  @Query((returns) => [Note])
  async list() {
    return this.notesService.findAll();
  }

  @Mutation((returns) => Note)
  async addNote(@Args('addNoteInput') addNoteInput: AddNoteInput) {
    return this.notesService.create(addNoteInput);
  }
}
