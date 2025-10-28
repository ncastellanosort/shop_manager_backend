import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('categories')
@UseGuards(AuthGuard)
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() req: Request,
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
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const authHeader = req.headers['authorization'] as string;
    if (!authHeader) throw new UnauthorizedException('no token provided');

    const token = this.authService.extract(authHeader);
    if (!token) throw new UnauthorizedException('invalid token format');

    return await this.categoriesService.findOne(+id, token);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Req() req: Request,
  ) {
    const authHeader = req.headers['authorization'] as string;
    if (!authHeader) throw new UnauthorizedException('no token provided');

    const token = this.authService.extract(authHeader);
    if (!token) throw new UnauthorizedException('invalid token format');

    return await this.categoriesService.update(+id, updateCategoryDto, token);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const authHeader = req.headers['authorization'] as string;
    if (!authHeader) throw new UnauthorizedException('no token provided');

    const token = this.authService.extract(authHeader);
    if (!token) throw new UnauthorizedException('invalid token format');

    return await this.categoriesService.remove(+id, token);
  }
}
