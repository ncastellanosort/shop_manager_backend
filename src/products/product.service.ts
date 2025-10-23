import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { JwtPayload } from 'src/auth/auth.guard';
import { Company } from 'src/companies/entities/company.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    private authService: AuthService,
  ) {}

  async saveProduct(product: Product, token: string): Promise<Product> {
    try {
      const payload = this.authService.validate(token) as JwtPayload;

      const currentCompany = await this.companyRepository.findOne({
        where: { id: payload.company.id },
      });

      if (!currentCompany) throw new BadRequestException('company not found');

      const newProduct = this.productRepository.create({
        ...product,
        companyId: currentCompany.id,
      });

      const savedProduct = await this.productRepository.save(newProduct);
      return savedProduct;
    } catch (err) {
      throw new BadRequestException(`err saving product: ${err}`);
    }
  }
}
