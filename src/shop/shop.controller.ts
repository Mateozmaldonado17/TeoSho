import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { IsDecimal, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { ITokenPayload } from 'inteface';

export interface IShopItem {
  price: string;
  productId: number;
}

export class ShopItemDto implements IShopItem {
  @IsDecimal()
  price: string;

  @IsNumber()
  productId: number;
}

export class ShopDto {
  @ValidateNested({
    message: 'format is invalid, try again',
  })
  @Type(() => ShopItemDto)
  items: ShopItemDto[];
}

@Controller('shop')
export class ShopController {
  constructor(private readonly _shopService: ShopService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() params: ShopDto, @Request() req) {
    const items = params.items;
    return this._shopService.create(items, req.user as ITokenPayload);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(@Request() req) {
    return this._shopService.getShops(req.user as ITokenPayload);
  }
}
