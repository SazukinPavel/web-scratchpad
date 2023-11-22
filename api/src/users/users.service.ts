import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getAll() {
    return this.usersRepository.find();
  }

  getById(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
  }

  async add(dto: CreateUserDto) {
    const hashedPass = await hash(dto.password, 10);

    const user = this.usersRepository.create({
      ...dto,
      password: hashedPass,
    });

    return await this.usersRepository.save(user);
  }

  findByUsername(username: string) {
    return this.usersRepository.findOneBy({ username });
  }
}
