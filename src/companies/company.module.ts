import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
/*
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
*/
import { SupabaseModule } from 'src/supabase/supabase.module';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  imports: [
    //TypeOrmModule.forFeature([Company]),
    SupabaseModule,
  ],
  providers: [CompanyService, SupabaseService],
  exports: [CompanyService],
})
export class CompanyModule {}
