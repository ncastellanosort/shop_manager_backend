import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Company } from './companies/entities/company.entity';
import { CompanyModule } from './companies/company.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './products/product.module';
import { Product } from './products/entities/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'shop_manager',
      entities: [Company, Product],
      synchronize: true,
    }),
    AuthModule,
    CompanyModule,
    ProductModule,
  ],
})
export class AppModule {}
