import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AppService } from 'src/app.service';
import { UserService } from './user.service';
import { PrismaService } from 'nestjs-prisma';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'i-am-think-that-i-am-the-right-person-for-this-position',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [AppService, UserService, PrismaService, JwtStrategy],
})
export class UserModule {}
