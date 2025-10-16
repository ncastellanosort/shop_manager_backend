import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Company } from 'src/companies/entities/company.entity';
import { CompanyLoginDTO } from './dto/company.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginDTO: CompanyLoginDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.login(loginDTO);
    res.setHeader('token', token);
    return { message: 'valid user' };
  }

  @Post('register')
  async register(@Body() company: Company): Promise<object> {
    const res = await this.authService.register(company);
    return res;
  }
}
