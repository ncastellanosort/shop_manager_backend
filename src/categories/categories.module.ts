import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { AuthModule } from 'src/auth/auth.module';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { JwtModule } from '@nestjs/jwt';
import { CompanyModule } from 'src/companies/company.module';

@Module({
  imports: [AuthModule, SupabaseModule, JwtModule, CompanyModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
