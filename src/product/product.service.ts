import { Get, HttpException, Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { CreateProductoDto, ProductDto } from './product.controller';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }

  private async getById(id: number): Promise<Product> {
    return await this.prisma.product.findFirst({
      where: {
        id,
      },
    });
  }

  private async getByName(name: string): Promise<Product> {
    return await this.prisma.product.findFirst({
      where: {
        name,
      },
    });
  }

  private async validateIfExistProductByName(name: string) {
    const getProduct = await this.getByName(name);
    if (getProduct) {
      throw new HttpException(`${name} is already exist`, 401);
    }
    return getProduct;
  }

  private async validateIfNotExistProductById(id: number) {
    const getProduct = await this.getById(id);
    if (!getProduct) {
      throw new HttpException('This product is not exist', 404);
    }
    return getProduct;
  }

  async findById(id: number): Promise<Product> {
    const getProduct = await this.validateIfNotExistProductById(id);
    return await getProduct;
  }

  async create(params: Omit<CreateProductoDto, 'id'>): Promise<Product> {
    const { name, image, description, price } = params;
    await this.validateIfExistProductByName(name);
    const newProduct = await this.prisma.product.create({
      data: {
        description,
        name,
        price,
        image,
      },
    });
    return await newProduct;
  }

  async update(params: CreateProductoDto & ProductDto): Promise<Product> {
    const { name, image, description, price, id } = params;
    await this.validateIfExistProductByName(name);
    const newProduct = await this.prisma.product.update({
      data: {
        description,
        name,
        price,
        image,
      },
      where: { id: parseInt(id) },
    });
    return await newProduct;
  }

  async delete(params: ProductDto): Promise<Product> {
    const { id } = params;
    await this.validateIfNotExistProductById(+id);
    const deletedProduct = await this.prisma.product.delete({
      where: { id: parseInt(id) },
    });
    return await deletedProduct;
  }
}
