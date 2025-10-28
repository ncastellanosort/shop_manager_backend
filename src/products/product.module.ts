import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CompanyModule } from 'src/companies/company.module';
import { Company } from 'src/companies/entities/company.entity';

@Module({
  imports: [
    AuthModule,
    CompanyModule,
    TypeOrmModule.forFeature([Company, Product]),
  ],
  controllers: [ProductController],
  providers: [JwtService, ProductService],
})
export class ProductModule {}
