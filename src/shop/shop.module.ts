import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { PrismaService } from 'nestjs-prisma';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [ProductModule],
  providers: [ShopService, PrismaService],
  controllers: [ShopController],
})
export class ShopModule {}
