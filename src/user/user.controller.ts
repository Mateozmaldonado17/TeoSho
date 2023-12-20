import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaPromise, User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  getAllUsers(): PrismaPromise<User[]> {
    return this._userService.getAllUsers();
  }

  @Post()
  createNewUser() {
    return this._userService.createNewUser('Mateo');
  }
}
