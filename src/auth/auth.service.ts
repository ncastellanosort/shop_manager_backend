import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CompanyService } from 'src/companies/company.service';
import { Company } from 'src/companies/entities/company.entity';
import { CompanyLoginDTO } from './dto/company.dto';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private companyRepository: CompanyService,
    private jwtService: JwtService,
  ) {}

  async login(loginDTO: CompanyLoginDTO) {
    const company = await this.companyRepository.findCompany(loginDTO.email);
    if (!company) {
      throw new UnauthorizedException('invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDTO.password,
      company.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('invalid credentials');
    }

    const payload = { company };
    return {
      company: {
        id: company.id,
        name: company.name,
        email: company.email,
      },
      token: await this.jwtService.signAsync(payload),
    };
  }

  async register(company: Company) {
    const hashedPassword = await bcrypt.hash(company.password, 10);
    const newCompany = { ...company, password: hashedPassword };

    try {
      const savedCompany = await this.companyRepository.saveCompany(newCompany);
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
      const decoded = this.jwtService.verifyAsync(token);
      return decoded;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
