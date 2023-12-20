import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AppService } from 'src/app.service';
import { UserService } from './user.service';
import { PrismaService } from 'nestjs-prisma';

@Module({
  controllers: [UserController],
  providers: [AppService, UserService, PrismaService],
})
export class UserModule {}
