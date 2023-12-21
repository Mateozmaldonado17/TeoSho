import { Test, TestingModule } from '@nestjs/testing';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { PrismaService } from 'nestjs-prisma';
import { ProductService } from '../product/product.service';

const tokenPayload = {
  id: 1,
  email: 'mateo.zapata@test.com',
};

const shopServiceMock = {
  create: jest.fn(),
  getShops: jest.fn(),
};

describe('ShopController', () => {
  let controller: ShopController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ShopService,
          useValue: shopServiceMock,
        },
        PrismaService,
        ProductService,
      ],
      controllers: [ShopController],
    }).compile();

    controller = module.get<ShopController>(ShopController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new shop', async () => {
    const params = {
      items: [
        {
          price: '12.32',
          productId: 1,
        },
      ],
    };
    await controller.create(params, tokenPayload);
    expect(shopServiceMock.create).toHaveBeenCalled();
  });

  it('should get All products', async () => {
    await controller.getAll(tokenPayload);
    expect(shopServiceMock.getShops).toHaveBeenCalled();
  });
});
