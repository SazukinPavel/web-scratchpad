import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import RegisterDto from './dto/register.dto';
import LoginDto from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const userWithSameUsername = await this.usersService.findByUsername(
      dto.username,
    );

    if (!userWithSameUsername) {
      throw new ForbiddenException('User with this username doesnt exist');
    }

    const isPasswordEqual = await compare(
      dto.password,
      userWithSameUsername.password,
    );

    if (!isPasswordEqual) {
      throw new ForbiddenException('Bad password');
    }

    return {
      user: userWithSameUsername,
      token: sign(
        {
          id: userWithSameUsername.id,
          username: userWithSameUsername.username,
        },
        this.configService.get('JWT_SECRET_KEY'),
      ),
    };
  }

  async register(dto: RegisterDto) {
    const userWithSameUsername = await this.usersService.findByUsername(
      dto.username,
    );
    if (userWithSameUsername) {
      throw new BadRequestException('User with same username already exist');
    }

    const user = await this.usersService.add(dto);

    return {
      user: user,
      token: sign(
        { id: user.id, username: user.username },
        this.configService.get('JWT_SECRET_KEY'),
      ),
    };
  }
}
