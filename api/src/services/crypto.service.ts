import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class CryptoService {
  constructor() {}

  hash(password: string) {
    return hash(password, 10);
  }

  compare(password: string, hash: string) {
    return compare(password, hash);
  }
}
