import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Note } from 'src/models/note.model';
import { AddNoteInput } from './dto/add-note.input';
import { NotesService } from './notes.service';
import { UpdateNoteInput } from './dto/update-note.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';

@Resolver((of) => Note)
@UseGuards(GqlAuthGuard)
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
  async add(@Args('addNoteInput') addNoteInput: AddNoteInput) {
    return this.notesService.create(addNoteInput);
  }

  @Mutation((returns) => Boolean)
  async delete(@Args('id', { type: () => String }) id: string) {
    return this.notesService.delete(id);
  }

  @Mutation((returns) => Note)
  async update(@Args('updateNoteInput') updateNoteInput: UpdateNoteInput) {
    return this.notesService.update(updateNoteInput);
  }
}
