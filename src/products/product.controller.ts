import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Controller()
export class ProductController {
  constructor(
    private productService: ProductService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('products')
  getAll() {
    return 'productos';
  }

  @Post('product')
  @HttpCode(HttpStatus.CREATED)
  async postProduct(@Body() product: Product, @Req() req: Request) {
    const authHeader = req.headers['authorization'] as string;
    if (!authHeader) {
      throw new UnauthorizedException('no token provided');
    }

    const token = this.authService.extract(authHeader);
    if (!token) {
      throw new UnauthorizedException('invalid token format');
    }
    return await this.productService.saveProduct(product, token);
  }
}
