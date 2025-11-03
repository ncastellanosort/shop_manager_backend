import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  imports: [SupabaseModule],
  providers: [CompanyService, SupabaseService],
  exports: [CompanyService],
})
export class CompanyModule {}
