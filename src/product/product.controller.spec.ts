import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

const product = {
  name: 'Tesla',
  description: 'It a great car',
  price: '80.000',
  image: 'great car jpg',
};

const productServiceMock = {
  getAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: productServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should run getAll', async () => {
    await controller.getAll();
    expect(productServiceMock.getAll).toHaveBeenCalled();
  });

  it('should run getById', async () => {
    const param = {
      id: '123',
    };
    await controller.getById(param);
    expect(productServiceMock.findById).toHaveBeenCalledWith(
      parseInt(param.id),
    );
  });

  it('should run create', async () => {
    await controller.create(product);
    expect(productServiceMock.create).toHaveBeenCalledWith(product);
  });

  it('should run update', async () => {
    const param = {
      id: '123',
      ...product,
    };
    await controller.update(param);
    expect(productServiceMock.update).toHaveBeenCalledWith(param);
  });

  it('should run delete', async () => {
    const param = {
      id: '123',
      ...product,
    };
    await controller.delete(param);
    expect(productServiceMock.delete).toHaveBeenCalledWith(param);
  });
});
