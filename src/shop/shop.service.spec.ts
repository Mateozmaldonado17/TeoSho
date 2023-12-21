import { Test, TestingModule } from '@nestjs/testing';
import { ShopService } from './shop.service';
import { PrismaService } from 'nestjs-prisma';
import { ProductService } from '../product/product.service';

const tokenPayload = {
  id: 1,
  email: 'mateo.zapata@test.com',
};

const productServiceMock = {
  validateIfNotExistProductById: jest.fn(),
};

const prismaServiceMock = {
  shop: {
    createMany: jest.fn(),
    findMany: jest.fn(),
  },
};

describe('ShopService', () => {
  let service: ShopService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShopService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
        {
          provide: ProductService,
          useValue: productServiceMock,
        },
      ],
    }).compile();

    service = module.get<ShopService>(ShopService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create correctly items', async () => {
    const params = {
      items: [
        {
          price: '12.32',
          productId: 1,
        },
      ],
    };
    await service.create(params.items, tokenPayload);
    expect(prismaServiceMock.shop.createMany).toHaveBeenCalled();
  });

  it('should get all correctly shops', async () => {
    await service.getShops(tokenPayload);
    expect(prismaServiceMock.shop.findMany).toHaveBeenCalled();
  });
});
