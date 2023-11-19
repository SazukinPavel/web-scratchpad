import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { NoteResolver } from './notes.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from 'src/models/note.model';
import { NotesService } from './notes.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
  ],
  providers: [NoteResolver,NotesService],
})
export class NotesModule {}
