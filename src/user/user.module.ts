import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AppService } from 'src/app.service';
import { UserService } from './user.service';
import { PrismaService } from 'nestjs-prisma';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'i-am-think-that-i-am-the-right-person-for-this-position',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UserController],
  providers: [AppService, UserService, PrismaService],
})
export class UserModule {}
