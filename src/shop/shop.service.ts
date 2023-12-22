import { HttpException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { IShopItem } from './shop.controller';
import { ITokenPayload } from 'inteface';
import { ProductService } from '../product/product.service';

@Injectable()
export class ShopService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => ProductService))
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

  async verifyIfExistShopsByProductId(productId: number) {
    const shopProduct = await this.prisma.shop.findMany({
      where: {
        productId,
      },
    });

    if (shopProduct.length) {
      throw new HttpException(
        'This product has Shops and we can`t delete it',
        401,
      );
    }
  }

  async getShops(user: ITokenPayload) {
    return this.prisma.shop.findMany({
      orderBy: [
        {
          boughtAt: 'desc',
        },
      ],
      where: {
        userId: user.id,
      },
      include: {
        product: true,
      },
    });
  }
}
