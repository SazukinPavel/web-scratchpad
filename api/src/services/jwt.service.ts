import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private get accessSecret() {
    return this.configService.get('JWT_ACCESS_SECRET_KEY');
  }

  private get refreshSecret() {
    return this.configService.get('JWT_REFRESH_SECRET_KEY');
  }

  constructor(private readonly configService: ConfigService) {}

  signRefresh(data: any) {
    return sign(data, this.refreshSecret, {
      expiresIn: '7d',
    });
  }

  signAccess(data: any) {
    return sign(data, this.accessSecret, {
      expiresIn: '1d',
    });
  }

  verifyRefresh(token: string) {
    return verify(token, this.refreshSecret);
  }

  verifyAccess(token: string) {
    return verify(token, this.accessSecret);
  }
}
