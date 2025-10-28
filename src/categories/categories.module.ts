import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { CompanyModule } from 'src/companies/company.module';
import { CompanyService } from 'src/companies/company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Company } from 'src/companies/entities/company.entity';

@Module({
  imports: [
    AuthModule,
    CompanyModule,
    TypeOrmModule.forFeature([Company, Category]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, JwtService, CompanyService],
})
export class CategoriesModule {}
