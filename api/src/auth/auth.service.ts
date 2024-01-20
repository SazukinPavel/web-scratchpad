import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import RegisterDto from './dto/register.dto';
import LoginDto from './dto/login.dto';
import { JwtService } from 'src/services/jwt.service';
import { CryptoService } from 'src/services/crypto.service';
import { User } from 'src/models/user.model';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
  ) { }

  async login(dto: LoginDto, response: Response) {
    const user = await this.usersService.findByUsername(dto.username);

    if (!user) {
      throw new ForbiddenException('User with this username doesnt exist');
    }

    const isPasswordEqual = await this.cryptoService.compare(
      dto.password,
      user.password,
    );

    if (!isPasswordEqual) {
      throw new ForbiddenException('Bad password');
    }

    this.setRefreshToken(user, response);

    return this.getAuthResponse(user);
  }

  logout(response: Response) {
    response.cookie(
      'web-scratchpad_refresh_token', null
    )
  }

  async register(dto: RegisterDto, response: Response) {
    const userWithSameUsername = await this.usersService.findByUsername(
      dto.username,
    );
    if (userWithSameUsername) {
      throw new BadRequestException('User with same username already exist');
    }

    const user = await this.usersService.add(dto);

    this.setRefreshToken(user, response);

    return this.getAuthResponse(user);
  }

  async me(request: Request, response: Response) {
    const refreshToken = request.cookies['web-scratchpad_refresh_token'];

    try {
      const data = await this.jwtService.verifyRefresh(refreshToken);
      const user = await this.usersService.getById((data as any).id);

      this.setRefreshToken(user, response);

      return this.getAuthResponse(user);
    } catch (e: any) {
      throw new UnauthorizedException('Wrong token');
    }
  }

  private setRefreshToken({ id, username }: User, response: Response) {
    response.cookie(
      'web-scratchpad_refresh_token',
      this.jwtService.signRefresh({ id, username }),
      { sameSite: 'none', secure: true }
    );
  }

  private getAuthResponse(user: User) {
    return {
      user: user,
      token: this.jwtService.signAccess({
        id: user.id,
        username: user.username,
      }),
    };
  }
}
