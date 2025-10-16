import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CompanyService } from 'src/companies/company.service';
import { Company } from 'src/companies/entities/company.entity';
import { CompanyLoginDTO } from './dto/company.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private companyRepository: CompanyService,
    private jwtService: JwtService,
  ) {}

  async login(loginDTO: CompanyLoginDTO) {
    const company = await this.companyRepository.findCompany(loginDTO.email);
    if (company?.hashedPassword !== loginDTO.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: company.taxId, username: company.name };
    return await this.jwtService.signAsync(payload);
  }

  async register(company: Company) {
    await this.companyRepository.saveCompany(company);
    return { status: 'company saved' };
  }
}
