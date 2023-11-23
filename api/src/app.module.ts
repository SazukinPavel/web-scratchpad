import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtService } from './services/jwt.service';
import { CryptoService } from './services/crypto.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('MONGO_DATABASE_ROOT_USERNAME');
        const password = configService.get('MONGO_DATABASE_ROOT_PASSWORD');
        const host = configService.get('MONGO_HOST');
        const port = configService.get('MONGO_PORT');
        const dbName = configService.get('MONGO_DATABASE_NAME');

        return {
          uri: `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=admin`,
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const host = configService.get('PG_HOST');
        const port = configService.get('PG_PORT');
        const username = configService.get('PG_ROOT_USER');
        const password = configService.get('PG_ROOT_PASSWORD');
        const dbName = configService.get('PG_DATABASE');

        return {
          type: 'postgres',
          host: host,
          port: +port,
          username: username,
          password: password,
          database: dbName,
          synchronize: true,
          entities: [User],
        };
      },
    }),
    NotesModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
