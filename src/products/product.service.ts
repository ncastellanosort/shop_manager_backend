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
        createdBy: currentCompany.email,
        updatedBy: currentCompany.email,
      });

      const savedProduct = await this.productRepository.save(newProduct);
      return savedProduct;
    } catch (err) {
      throw new BadRequestException(`err saving product: ${err}`);
    }
  }

  async getProduct(productId: number, token: string) {
    try {
      const payload = (await this.authService.validate(token)) as JwtPayload;

      const currentCompany = await this.companyRepository.findOne({
        where: { id: payload.company.id },
      });

      if (!currentCompany) throw new BadRequestException('company not found');

      const product = await this.productRepository.findOne({
        where: { id: productId, companyId: currentCompany.id },
      });

      if (!product) throw new BadRequestException('product not found');

      return product;
    } catch (err) {
      throw new BadRequestException(`err getting product: ${err}`);
    }
  }

  async patchProduct(
    productId: number,
    partialProduct: Partial<Product>,
    token: string,
  ) {
    try {
      const payload = (await this.authService.validate(token)) as JwtPayload;

      const currentCompany = await this.companyRepository.findOne({
        where: { id: payload.company.id },
      });

      if (!currentCompany) {
        throw new BadRequestException('company not found');
      }

      const product = await this.productRepository.findOne({
        where: { id: productId, companyId: currentCompany.id },
      });

      if (!product) {
        throw new BadRequestException('product not found');
      }

      Object.assign(product, partialProduct);

      const updatedProduct = await this.productRepository.save(product);

      return {
        message: 'product updated succesfully',
        data: updatedProduct,
      };
    } catch (err) {
      throw new BadRequestException(`error updating product: ${err}`);
    }
  }

  async deleteProduct(productId: number, token: string) {
    try {
      const payload = (await this.authService.validate(token)) as JwtPayload;

      const currentCompany = await this.companyRepository.findOne({
        where: { id: payload.company.id },
      });

      if (!currentCompany) {
        throw new BadRequestException('company not found');
      }

      const product = await this.productRepository.findOne({
        where: { id: productId, companyId: currentCompany.id },
      });

      if (!product) {
        throw new BadRequestException('product not found');
      }

      product.deleted = true;
      product.state = 'hidden';

      await this.productRepository.save(product);

      return {
        message: 'product deleted successfully (soft delete)',
        id: productId,
      };
    } catch (err) {
      throw new BadRequestException(`error deleting product: ${err}`);
    }
  }
}
