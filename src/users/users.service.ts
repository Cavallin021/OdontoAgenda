import { Injectable, ConflictException } from '@nestjs/common';
import { error } from 'console';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByNickname(nickname: string) {
    return this.prisma.user.findUnique({
      where: { nickname },
    });
  }

  async create(nickname: string, password: string) {
    const user = await this.findByNickname(nickname);

    if (user) {
      throw new ConflictException('Este nickname já está em uso');
    }

    return this.prisma.user.create({
      data: { nickname, password },
    });
  }
}
