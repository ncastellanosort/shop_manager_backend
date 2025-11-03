import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import type { CreateCategoryDto } from './dto/create-category.dto';
import type { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    const authHeader = req.headers['authorization'] as string;
    if (!authHeader) throw new UnauthorizedException('no token provided');

    const token = this.authService.extract(authHeader);
    if (!token) throw new UnauthorizedException('invalid token format');

    return await this.categoriesService.create(createCategoryDto, token);
  }

  @Get()
  async findAll(@Req() req: Request) {
    const authHeader = req.headers['authorization'] as string;
    if (!authHeader) throw new UnauthorizedException('no token provided');

    const token = this.authService.extract(authHeader);
    if (!token) throw new UnauthorizedException('invalid token format');
    return await this.categoriesService.findAll(token);
  }

  @Get(':id')
  async findOne(@Req() req: Request, @Param('id') id: string) {
    const authHeader = req.headers['authorization'] as string;
    if (!authHeader) throw new UnauthorizedException('no token provided');

    const token = this.authService.extract(authHeader);
    if (!token) throw new UnauthorizedException('invalid token format');
    return this.categoriesService.findOne(+id, token);
  }

  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const authHeader = req.headers['authorization'] as string;
    if (!authHeader) throw new UnauthorizedException('no token provided');

    const token = this.authService.extract(authHeader);
    if (!token) throw new UnauthorizedException('invalid token format');
    return await this.categoriesService.update(+id, updateCategoryDto, token);
  }

  @Delete(':id')
  async remove(@Req() req: Request, @Param('id') id: string) {
    const authHeader = req.headers['authorization'] as string;
    if (!authHeader) throw new UnauthorizedException('no token provided');

    const token = this.authService.extract(authHeader);
    if (!token) throw new UnauthorizedException('invalid token format');
    return await this.categoriesService.remove(+id, token);
  }
}
