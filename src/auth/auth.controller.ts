import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CompanyLoginDTO } from './dto/company.dto';
import type { Company } from 'src/companies/types/company.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDTO: CompanyLoginDTO) {
    const { company, token } = await this.authService.login(loginDTO);
    return { company: company, token: token };
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() company: Company): Promise<object> {
    const res = await this.authService.register(company);
    return res;
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getMe(@Req() req: Request) {
    const authHeader = req.headers['authorization'] as string;
    if (!authHeader) throw new UnauthorizedException('no token provided');

    const token = this.authService.extract(authHeader);
    if (!token) throw new UnauthorizedException('invalid token format');

    const data = (await this.authService.validate(token)) as Company;
    return data;
  }
}
