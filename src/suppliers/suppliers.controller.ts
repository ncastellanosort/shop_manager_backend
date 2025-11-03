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
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { SuppliersService } from './suppliers.service';
import type { CreateSupplierDto } from './dto/create-supplier.dto';
import type { UpdateSupplierDto } from './dto/update-supplier.dto';

@UseGuards(AuthGuard)
@Controller('suppliers')
export class SuppliersController {
  constructor(
    private readonly suppliersService: SuppliersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body() createSupplierDto: CreateSupplierDto,
  ) {
    const authHeader = req.headers['authorization'] as string;
    if (!authHeader) throw new UnauthorizedException('no token provided');

    const token = this.authService.extract(authHeader);
    if (!token) throw new UnauthorizedException('invalid token format');

    return await this.suppliersService.create(createSupplierDto, token);
  }

  @Get()
  async findAll(@Req() req: Request) {
    const authHeader = req.headers['authorization'] as string;
    if (!authHeader) throw new UnauthorizedException('no token provided');

    const token = this.authService.extract(authHeader);
    if (!token) throw new UnauthorizedException('invalid token format');
    return await this.suppliersService.findAll(token);
  }

  @Get(':id')
  async findOne(@Req() req: Request, @Param('id') id: string) {
    const authHeader = req.headers['authorization'] as string;
    if (!authHeader) throw new UnauthorizedException('no token provided');

    const token = this.authService.extract(authHeader);
    if (!token) throw new UnauthorizedException('invalid token format');
    return this.suppliersService.findOne(+id, token);
  }

  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    const authHeader = req.headers['authorization'] as string;
    if (!authHeader) throw new UnauthorizedException('no token provided');

    const token = this.authService.extract(authHeader);
    if (!token) throw new UnauthorizedException('invalid token format');
    return await this.suppliersService.update(+id, updateSupplierDto, token);
  }

  @Delete(':id')
  async remove(@Req() req: Request, @Param('id') id: string) {
    const authHeader = req.headers['authorization'] as string;
    if (!authHeader) throw new UnauthorizedException('no token provided');

    const token = this.authService.extract(authHeader);
    if (!token) throw new UnauthorizedException('invalid token format');
    return await this.suppliersService.remove(+id, token);
  }
}
