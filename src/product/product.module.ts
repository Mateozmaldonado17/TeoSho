import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaService } from 'nestjs-prisma';
import { ShopService } from '../shop/shop.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, ShopService],
  exports: [ProductService],
})
export class ProductModule {}
