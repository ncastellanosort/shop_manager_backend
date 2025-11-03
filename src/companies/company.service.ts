import { BadRequestException, Injectable } from '@nestjs/common';
import { Company } from './entities/company.entity';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class CompanyService {
  constructor(private supabaseService: SupabaseService) {}

  async saveCompany(company: Company) {
    try {
      const supabase = this.supabaseService.getClient();
      const { data, error } = await supabase
        .from('companies')
        .insert(company)
        .select();
      if (error)
        throw new BadRequestException(
          `err saving company (supabase) ${error.code}`,
        );
      return data;
    } catch (err) {
      throw new BadRequestException(`err saving company: ${err}`);
    }
  }

  async findCompany(email: string) {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('email', email)
      .single();

    /*
    const company = await this.companyRepository.findOne({
      where: {
        email: email,
      },
    });
    */

    if (error) throw new BadRequestException('company not found');

    return data as Company;
  }
}
