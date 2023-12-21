import { Test, TestingModule } from '@nestjs/testing';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { PrismaService } from 'nestjs-prisma';
import { ProductService } from '../product/product.service';

describe('ShopController', () => {
  let controller: ShopController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopService, PrismaService, ProductService],
      controllers: [ShopController],
    }).compile();

    controller = module.get<ShopController>(ShopController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
