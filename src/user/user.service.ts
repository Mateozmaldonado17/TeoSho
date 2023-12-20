import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import type { PrismaPromise, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getAllUsers(): PrismaPromise<User[]> {
    return this.prisma.user.findMany();
  }

  async createNewUser(passwordToGenerate: string) {
    const saltOrRounds = 10;
    const password = passwordToGenerate;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }
}
