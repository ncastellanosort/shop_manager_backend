import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) {}

  async saveCompany(company: Company): Promise<Company> {
    const savedCompany = await this.companyRepository.save(company);
    return savedCompany;
  }
}
