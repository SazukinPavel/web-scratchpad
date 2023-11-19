import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_DATABASE_ROOT_USERNAME}:${process.env.MONGO_DATABASE_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE_NAME}?authSource=admin`,
    ),
    NotesModule,
  ],
})
export class AppModule {}
