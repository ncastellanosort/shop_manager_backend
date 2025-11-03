import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { CompanyModule } from 'src/companies/company.module';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [AuthModule, SupabaseModule, JwtModule, CompanyModule],
  controllers: [SuppliersController],
  providers: [SuppliersService],
})
export class SuppliersModule {}
