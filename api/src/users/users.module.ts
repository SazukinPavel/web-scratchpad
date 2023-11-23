import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/models/user.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoService } from 'src/services/crypto.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, CryptoService],
  exports: [UsersService],
})
export class UsersModule {}
