import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Company } from 'src/companies/entities/company.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private authService: AuthService,
  ) {}

  async saveProduct(product: Product, token: string): Promise<Product> {
    try {
      const currentCompany = this.authService.validate(token) as Company;
      const formattedProduct = this.productRepository.merge(
        product,
        currentCompany,
      );
      console.log(formattedProduct); // lo muestra bien pero no lo guarda
      const savedProduct = await this.productRepository.save(formattedProduct);
      return savedProduct;
    } catch {
      throw new BadRequestException('err saving product');
    }
  }
}
