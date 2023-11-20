import { Module } from '@nestjs/common';
import { NoteResolver } from './notes.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from 'src/models/note.model';
import { NotesService } from './notes.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
  ],
  providers: [NoteResolver, NotesService],
})
export class NotesModule {}
