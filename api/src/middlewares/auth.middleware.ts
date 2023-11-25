import { NextFunction, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '../services/jwt.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private usersService: UsersService,
    private jwtServise: JwtService,
  ) {}

  async use(req: any, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
      try {
        const parsedToken = await this.jwtServise.verifyRefresh(token);
        req.user = this.usersService.getById((parsedToken as any).id);
      } catch {}
    }
    next();
  }
}
