import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AuthModule } from 'src/auth/auth.module';
import { SupabaseModule } from 'src/supabase/supabase.module';
import { JwtModule } from '@nestjs/jwt';
import { CompanyModule } from 'src/companies/company.module';

@Module({
  imports: [AuthModule, SupabaseModule, JwtModule, CompanyModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
