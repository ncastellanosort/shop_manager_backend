import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
