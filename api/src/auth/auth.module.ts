import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtService } from 'src/services/jwt.service';
import { CryptoService } from 'src/services/crypto.service';

@Module({
  imports: [UsersModule],
  providers: [AuthService, JwtService, CryptoService],
  controllers: [AuthController],
})
export class AuthModule {}
