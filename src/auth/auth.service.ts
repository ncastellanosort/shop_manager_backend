import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
    const payload = { company };
    return {
      company: company,
      token: await this.jwtService.signAsync(payload),
    };
  }

  async register(company: Company) {
    try {
      const savedCompany = await this.companyRepository.saveCompany(company);
      return savedCompany;
    } catch (err) {
      throw new BadRequestException(`err saving company: ${err}`);
    }
  }

  extract(token: string) {
    return token.split(' ')[1];
  }

  validate(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
