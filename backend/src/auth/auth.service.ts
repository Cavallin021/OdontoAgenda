import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(nickname: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    return this.usersService.create(nickname, hashed);
  }

  async login(nickname: string, password: string) {
    const user = await this.usersService.findByNickname(nickname);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Senha incorreta!');
    }

    const payload = { sub: user.id, nickname: user.nickname };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
