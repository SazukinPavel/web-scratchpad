import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Note } from 'src/models/note.model';
import { AddNoteInput } from './dto/add-note.input';
import { NotesService } from './notes.service';
import { UpdateNoteInput } from './dto/update-note.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { User } from 'src/models/user.model';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Resolver((of) => Note)
@UseGuards(GqlAuthGuard)
export class NoteResolver {
  constructor(private readonly notesService: NotesService) { }

  @Query((returns) => Note)
  async one(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user: User,
  ) {
    return this.notesService.findOne(id, user);
  }

  @Query((returns) => [Note])
  async list(@CurrentUser() user: User,) {
    return this.notesService.findAll(user);
  }

  @Mutation((returns) => Note)
  async add(@Args('addNoteInput') addNoteInput: AddNoteInput, @CurrentUser() user: User,) {
    return this.notesService.create(addNoteInput, user);
  }

  @Mutation((returns) => Boolean)
  async delete(@Args('id', { type: () => String }) id: string, @CurrentUser() user: User,) {
    return this.notesService.delete(id, user);
  }

  @Mutation((returns) => Note)
  async update(@Args('updateNoteInput') updateNoteInput: UpdateNoteInput, @CurrentUser() user: User,) {
    return this.notesService.update(updateNoteInput, user);
  }
}
