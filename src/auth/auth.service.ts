import { Injectable } from '@nestjs/common';
import { CompanyService } from 'src/companies/company.service';
import { Company } from 'src/companies/entities/company.entity';

@Injectable()
export class AuthService {
  constructor(private companyRepository: CompanyService) {}

  /*
  login(user: LoginDTO): object {
    const { email } = user;
    // generar token y enviar por header
    return { user_email: email, authenticated: true };
  }
  */

  async register(company: Company) {
    await this.companyRepository.saveCompany(company);
    return { status: 'company saved' };
    // registrarlo y devolver el token
  }
}
