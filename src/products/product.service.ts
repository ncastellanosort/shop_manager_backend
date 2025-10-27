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

  async getProducts(token: string) {
    try {
      const payload = (await this.authService.validate(token)) as JwtPayload;

      const currentCompany = await this.companyRepository.findOne({
        where: { id: payload.company.id },
      });

      if (!currentCompany) throw new BadRequestException('company not found');

      const products = await this.productRepository.find({
        where: { companyId: currentCompany.id },
      });
      return products;
    } catch (err) {
      throw new BadRequestException(`err saving product: ${err}`);
    }
  }

  async saveProduct(product: Product, token: string): Promise<Product> {
    try {
      const payload = (await this.authService.validate(token)) as JwtPayload;

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
