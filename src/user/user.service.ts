import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './user.controller';
import type { PrismaPromise, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtTokenService: JwtService,
  ) {}

  getAllUsers(): PrismaPromise<User[]> {
    return this.prisma.user.findMany();
  }

  private async generateHashByPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  private async findUserByEmail(email: string) {
    const getUserByEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return getUserByEmail;
  }

  private async validatePassword(
    passwordFromBody: string,
    passwordFromDatabase: string,
  ) {
    return await bcrypt.compare(passwordFromBody, passwordFromDatabase);
  }

  private async validateThatNotExistEmail(email: string) {
    const getUserByEmail = await this.findUserByEmail(email);
    if (getUserByEmail) {
      throw new UnauthorizedException({
        error: `${email} is already exist`,
      });
    }
  }

  async createNewUser(params: CreateUserDto) {
    const { email, password, name } = params;
    await this.validateThatNotExistEmail(email);
    const passwordGenerated = await this.generateHashByPassword(password);
    return this.prisma.user.create({
      data: {
        email,
        name,
        password: passwordGenerated,
      },
    });
  }

  private generateJwt = (getUser: User) => {
    const payload = {
      email: getUser.email,
      id: getUser.id,
      name: getUser.name,
    };
    return this.jwtTokenService.sign(payload);
  };

  async signIn(params: Omit<CreateUserDto, 'name'>) {
    const { password, email } = params;
    const getUser = await this.findUserByEmail(email);
    if (!getUser) {
      throw new UnauthorizedException({
        error: `${email} not exist in our platform`,
      });
    }
    const match = await this.validatePassword(password, getUser.password);

    if (match) {
      return this.generateJwt(getUser);
    }
    throw new UnauthorizedException({
      error: 'Email or Password are invalid, try again',
    });
  }
}
