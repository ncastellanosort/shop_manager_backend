import type { Company } from './types/company.type';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class CompanyService {
  constructor(private supabaseService: SupabaseService) {}

  async saveCompany(company: Company) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('companies')
      .insert(company)
      .select()
      .single();

    if (error) {
      throw new BadRequestException(
        `err inserting in supabase: ${error.message}`,
      );
    }
    if (!data) {
      throw new BadRequestException('company could not be saved');
    }

    return data as Company;
  }

  async findCompany(email: string) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw new BadRequestException('company not found');

    return data as Company;
  }
}
