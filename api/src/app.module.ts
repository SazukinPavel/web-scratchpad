import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { JwtService } from './services/jwt.service';
import { TopicsModule } from './topics/topics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      path:"api/graphql",
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
        const dbName = configService.get('MONGO_DATABASE_NAME');
        const driver = configService.get('MONGO_DRIVER');
        const params = configService.get('MONGO_PARAMS');
        const port = configService.get('MONGO_PORT');

        return {
          uri:`${driver}://${username}:${password}@${host}${port?":"+port:''}/${dbName}?${params}`
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
        const ssl = +configService.get('PG_IS_SSL')===1;

        return {
          type: 'postgres',
          host: host,
          port: +port,
          username: username,
          password: password,
          database: dbName,
          synchronize: true,
          entities: [User],
          ssl
        };
      },
    }),
    NotesModule,
    UsersModule,
    AuthModule,
    TopicsModule,
  ],
  providers: [JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
