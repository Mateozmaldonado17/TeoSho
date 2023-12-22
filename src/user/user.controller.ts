import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaPromise, User } from '@prisma/client';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { ITokenPayload } from 'inteface';

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

export class UpdateUserDto {
  @IsEmail()
  email: string;

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
  async signIn(@Body() createUserDto: Omit<CreateUserDto, 'name'>) {
    return await this._userService.signIn(createUserDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  isValid(@Request() req): Promise<User> {
    return this._userService.me(req.user as ITokenPayload);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  updateInformation(@Body() createUserDto: UpdateUserDto, @Request() req) {
    return this._userService.updateInformation(
      createUserDto,
      req.user as ITokenPayload,
    );
  }
}
