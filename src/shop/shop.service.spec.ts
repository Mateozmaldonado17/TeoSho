import { Test, TestingModule } from '@nestjs/testing';
import { ShopService } from './shop.service';
import { ProductModule } from '../product/product.module';
import { PrismaService } from 'nestjs-prisma';

describe('ShopService', () => {
  let service: ShopService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ProductModule],
      providers: [ShopService, PrismaService],
    }).compile();

    service = module.get<ShopService>(ShopService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
