import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { Product } from './types/product.type';
import { AuthService } from 'src/auth/auth.service';
import { JwtPayload } from 'src/auth/auth.guard';

@Injectable()
export class ProductsService {
  constructor(
    private supabaseService: SupabaseService,
    private authService: AuthService,
  ) {}

  async create(createProductDto: CreateProductDto, token: string) {
    try {
      const payload = (await this.authService.validate(token)) as JwtPayload;

      const supabase = this.supabaseService.getClient();

      const newProduct = {
        ...createProductDto,
        company_id: payload.company.id,
      };

      const { data, error } = await supabase
        .from('products')
        .insert(newProduct)
        .select()
        .single();

      if (error) {
        throw new BadRequestException(
          `err inserting in supabase: ${error.message}`,
        );
      }

      if (!data) {
        throw new BadRequestException('product could not be saved');
      }

      return data as Product;
    } catch (err) {
      throw new BadRequestException(`err saving product: ${err}`);
    }
  }

  async findAll(token: string) {
    try {
      const payload = (await this.authService.validate(token)) as JwtPayload;

      const supabase = this.supabaseService.getClient();

      const { data, error } = await supabase
        .from('products')
        .select()
        .eq('company_id', payload.company.id);

      if (error) {
        throw new BadRequestException(
          `err getting all products in supabase: ${error.message}`,
        );
      }

      if (!data) {
        throw new BadRequestException('product could not be saved');
      }

      return data as Product[];
    } catch (err) {
      throw new BadRequestException(`err finding products: ${err}`);
    }
  }

  async findOne(id: number, token: string) {
    try {
      const payload = (await this.authService.validate(token)) as JwtPayload;

      const supabase = this.supabaseService.getClient();

      const { data, error } = await supabase
        .from('products')
        .select()
        .eq('company_id', payload.company.id)
        .eq('id', id)
        .single();

      if (error) {
        throw new BadRequestException(
          `err finding one in supabase: ${error.message}`,
        );
      }

      if (!data) {
        throw new BadRequestException('product not found');
      }
      return data as Product;
    } catch (err) {
      throw new BadRequestException(`err finding product: ${err}`);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto, token: string) {
    try {
      const payload = (await this.authService.validate(token)) as JwtPayload;

      const supabase = this.supabaseService.getClient();

      const { data, error } = await supabase
        .from('products')
        .update(updateProductDto)
        .eq('company_id', payload.company.id)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new BadRequestException(
          `err updating one in supabase: ${error.message}`,
        );
      }

      if (!data) {
        throw new BadRequestException('product not found');
      }
      return data as Product;
    } catch (err) {
      throw new BadRequestException(`err updating the product: ${err}`);
    }
  }

  async remove(id: number, token: string) {
    try {
      const payload = (await this.authService.validate(token)) as JwtPayload;

      const supabase = this.supabaseService.getClient();

      const { data, error } = await supabase
        .from('products')
        .delete()
        .eq('company_id', payload.company.id)
        .eq('id', id);

      if (error) {
        throw new BadRequestException(
          `err removing one in supabase: ${error.message}`,
        );
      }

      if (!data) {
        throw new NotFoundException('product not found');
      }

      return { status: 'removed' };
    } catch (err) {
      throw new BadRequestException(`err removing product: ${err}`);
    }
  }
}
