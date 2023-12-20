import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaPromise, User } from '@prisma/client';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @MinLength(5)
  name: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  getAllUsers(): PrismaPromise<User[]> {
    return this._userService.getAllUsers();
  }

  @Post()
  createNewUser(@Body() createUserDto: CreateUserDto) {
    return this._userService.createNewUser(createUserDto);
  }

  @Post('sign-in')
  signIn(@Body() createUserDto: Omit<CreateUserDto, 'name'>) {
    return this._userService.signIn(createUserDto);
  }
}
