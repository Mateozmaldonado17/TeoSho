import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { IsDecimal, IsNotEmpty, IsNumberString, IsUrl } from 'class-validator';
import { JwtAuthGuard } from '../jwt-auth.guard';

export class ProductDto {
  @IsNumberString()
  id: string;
}

export class CreateProductoDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsDecimal()
  price: string;

  @IsUrl()
  image: string;
}

@Controller('product')
export class ProductController {
  constructor(private readonly _productService: ProductService) {}

  @Get()
  getAll(): Promise<Product[]> {
    return this._productService.getAll();
  }

  @Get(':id')
  getById(
    @Param()
    params: ProductDto,
  ): Promise<Product> {
    const { id } = params;
    return this._productService.findById(parseInt(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() params: CreateProductoDto): Promise<Product> {
    try {
      return this._productService.create(params);
    } catch (error) {
      console.log(error);
    }
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  update(@Body() params: CreateProductoDto & ProductDto): Promise<Product> {
    return this._productService.update(params);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  delete(@Body() params: CreateProductoDto & ProductDto): Promise<Product> {
    return this._productService.delete(params);
  }
}
