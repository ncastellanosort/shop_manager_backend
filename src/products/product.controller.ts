import { Controller, Get } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller()
export class ProductController {
  constructor() {}

  @UseGuards(AuthGuard)
  @Get('products')
  getAll() {
    return 'productos';
  }
}
