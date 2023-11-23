import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import RegisterDto from './dto/register.dto';
import LoginDto from './dto/login.dto';
import { JwtService } from 'src/services/jwt.service';
import { CryptoService } from 'src/services/crypto.service';
import { User } from 'src/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
  ) {}

  async login(dto: LoginDto) {
    const userWithSameUsername = await this.usersService.findByUsername(
      dto.username,
    );

    if (!userWithSameUsername) {
      throw new ForbiddenException('User with this username doesnt exist');
    }

    const isPasswordEqual = await this.cryptoService.compare(
      dto.password,
      userWithSameUsername.password,
    );

    if (!isPasswordEqual) {
      throw new ForbiddenException('Bad password');
    }

    return this.getAuthResponse(userWithSameUsername);
  }

  async register(dto: RegisterDto) {
    const userWithSameUsername = await this.usersService.findByUsername(
      dto.username,
    );
    if (userWithSameUsername) {
      throw new BadRequestException('User with same username already exist');
    }

    const user = await this.usersService.add(dto);

    return this.getAuthResponse(user);
  }

  private getAuthResponse(user: User) {
    return {
      user: user,
      token: this.jwtService.sign({ id: user.id, username: user.username }),
    };
  }
}
