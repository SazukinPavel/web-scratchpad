import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      formatError: (error: any) => {
        const graphQLFormattedError = {
          message:
            error.extensions?.exception?.response?.message || error.message,
          code:
            error.extensions?.status ||
            error.extensions?.code ||
            'SERVER_ERROR',
          name:
            error.extensions?.originalError?.error ||
            error.extensions?.exception?.name ||
            error.name,
        };
        return graphQLFormattedError;
      },
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_DATABASE_ROOT_USERNAME}:${process.env.MONGO_DATABASE_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE_NAME}?authSource=admin`,
    ),
    NotesModule,
  ],
})
export class AppModule {}
