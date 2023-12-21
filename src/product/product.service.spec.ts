import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from 'nestjs-prisma';

const product = {
  name: 'Car',
  image: 'image.jpg',
  description: 'Descripcion del producto',
  price: '100.21',
};

const prismaServiceMock = {
  product: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get many products', async () => {
    await service.getAll();
    expect(prismaServiceMock.product.findMany).toHaveBeenCalled();
  });

  describe('validateIfNotExistProductById', () => {
    it('should throw an error if not exist product by id', async () => {
      try {
        prismaServiceMock.product.findMany.mockRejectedValueOnce(false);
        await service.validateIfNotExistProductById(1);
      } catch (error) {
        expect(error.response).toEqual('This product is not exist');
      }
    });
    it('should run without errors', async () => {
      prismaServiceMock.product.findFirst.mockResolvedValueOnce(true);
      const result = await service.validateIfNotExistProductById(1);
      expect(result).toEqual(true);
    });
  });

  it('findById', async () => {
    prismaServiceMock.product.findFirst.mockResolvedValueOnce(true);
    const result = await service.findById(1);
    expect(result).toEqual(true);
  });

  it('delete', async () => {
    prismaServiceMock.product.findFirst.mockResolvedValueOnce(true);
    const param = {
      id: '123',
    };
    await service.delete(param);
    expect(prismaServiceMock.product.delete).toHaveBeenCalledWith({
      where: { id: +param.id },
    });
  });

  describe('Create', () => {
    it('should throw an error if  exist product by name', async () => {
      prismaServiceMock.product.findFirst.mockResolvedValueOnce(product);
      try {
        await service.create(product);
      } catch (error) {
        expect(error.response).toEqual(`${product.name} is already exist`);
      }
    });

    it('should run without problem', async () => {
      prismaServiceMock.product.findFirst.mockReturnValueOnce(false);
      await service.create({
        ...product,
      });
      expect(prismaServiceMock.product.create).toHaveBeenCalled();
    });
  });

  describe('Update', () => {
    const param = {
      id: '1',
      ...product,
    };
    it('should throw an error if  exist product by name', async () => {
      prismaServiceMock.product.findFirst.mockResolvedValueOnce(product);
      try {
        await service.update(param);
      } catch (error) {
        expect(error.response).toEqual(`${product.name} is already exist`);
      }
    });

    it('should run without problem', async () => {
      prismaServiceMock.product.findFirst.mockReturnValueOnce(false);
      await service.update(param);
      expect(prismaServiceMock.product.create).toHaveBeenCalled();
    });
  });
});
