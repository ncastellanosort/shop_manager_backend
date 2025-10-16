import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  UnauthorizedException,
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
    const { company, token } = await this.authService.login(loginDTO);
    res.setHeader('auth_token', token);
    return { company: company };
  }

  @Post('register')
  async register(@Body() company: Company): Promise<object> {
    const res = await this.authService.register(company);
    return res;
  }

  @Post('me')
  getMe(@Req() req: Request) {
    const auth_token = req.headers['auth_token'] as string;
    if (!auth_token) {
      throw new UnauthorizedException('no token available');
    }
    const data = this.authService.validate(auth_token);
    return data;
  }
}
