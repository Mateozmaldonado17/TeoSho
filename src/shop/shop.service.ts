import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { IShopItem } from './shop.controller';
import { ITokenPayload } from 'inteface';
import { ProductService } from '../product/product.service';

@Injectable()
export class ShopService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly _productService: ProductService,
  ) {}

  async create(items: IShopItem[], user: ITokenPayload) {
    const data = await Promise.all(
      items.map(async (item: IShopItem) => {
        await this._productService.validateIfNotExistProductById(
          item.productId,
        );
        return {
          ...item,
          boughtAt: new Date(),
          userId: user.id,
        };
      }),
    );

    const insert = this.prisma.shop.createMany({
      data: data,
      skipDuplicates: true,
    });
    return insert;
  }

  async getShops(user: ITokenPayload) {
    return this.prisma.shop.findMany({
      where: {
        userId: user.id,
      },
      include: {
        product: true,
      },
    });
  }
}
