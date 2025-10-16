import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Company } from 'src/companies/entities/company.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /*
  @Post('login')
  login(@Body() user: LoginDTO): object {
    console.log(user);
    return this.authService.login(user);
  }
  */

  @Post('register')
  async register(@Body() company: Company): Promise<object> {
    const res = await this.authService.register(company);
    return res;
  }
}
