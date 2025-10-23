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
import { Company } from 'src/companies/entities/company.entity';
import { CompanyLoginDTO } from './dto/company.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDTO: CompanyLoginDTO) {
    const { company, token } = await this.authService.login(loginDTO);
    return { company: company, token: token };
  }

  @Post('register')
  async register(@Body() company: Company): Promise<object> {
    const res = await this.authService.register(company);
    return res;
  }

  @Get('me')
  getMe(@Req() req: Request) {
    const authHeader = req.headers['authorization'] as string;
    if (!authHeader) throw new UnauthorizedException('no token provided');

    const token = this.authService.extract(authHeader);
    if (!token) throw new UnauthorizedException('invalid token format');

    const data = this.authService.validate(token) as Company;
    return data;
  }
}
