import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { Category } from './types/category.types';
import { AuthService } from 'src/auth/auth.service';
import { JwtPayload } from 'src/auth/auth.guard';

@Injectable()
export class CategoriesService {
  constructor(
    private supabaseService: SupabaseService,
    private authService: AuthService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, token: string) {
    try {
      const payload = (await this.authService.validate(token)) as JwtPayload;

      const supabase = this.supabaseService.getClient();

      const newCategory = {
        ...createCategoryDto,
        company_id: payload.company.id,
      };

      const { data, error } = await supabase
        .from('categories')
        .insert(newCategory)
        .select()
        .single();

      if (error) {
        throw new BadRequestException(
          `err inserting in supabase: ${error.message}`,
        );
      }

      if (!data) {
        throw new BadRequestException('category could not be saved');
      }

      return data as Category;
    } catch (err) {
      throw new BadRequestException(`err saving category: ${err}`);
    }
  }

  async findAll(token: string) {
    try {
      const payload = (await this.authService.validate(token)) as JwtPayload;

      const supabase = this.supabaseService.getClient();

      const { data, error } = await supabase
        .from('categories')
        .select()
        .eq('company_id', payload.company.id);

      if (error) {
        throw new BadRequestException(
          `err getting all categories in supabase: ${error.message}`,
        );
      }

      if (!data) {
        throw new BadRequestException('category could not be saved');
      }

      return data as Category[];
    } catch (err) {
      throw new BadRequestException(`err finding categories: ${err}`);
    }
  }

  async findOne(id: number, token: string) {
    try {
      const payload = (await this.authService.validate(token)) as JwtPayload;

      const supabase = this.supabaseService.getClient();

      const { data, error } = await supabase
        .from('categories')
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
        throw new BadRequestException('category not found');
      }
      return data as Category;
    } catch (err) {
      throw new BadRequestException(`err finding category: ${err}`);
    }
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
    token: string,
  ) {
    try {
      const payload = (await this.authService.validate(token)) as JwtPayload;

      const supabase = this.supabaseService.getClient();

      const { data, error } = await supabase
        .from('categories')
        .update(updateCategoryDto)
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
        throw new BadRequestException('category not found');
      }
      return data as Category;
    } catch (err) {
      throw new BadRequestException(`err updating the category: ${err}`);
    }
  }

  async remove(id: number, token: string) {
    try {
      const payload = (await this.authService.validate(token)) as JwtPayload;

      const supabase = this.supabaseService.getClient();

      const { data, error } = await supabase
        .from('categories')
        .delete()
        .eq('company_id', payload.company.id)
        .eq('id', id);

      if (error) {
        throw new BadRequestException(
          `err removing one in supabase: ${error.message}`,
        );
      }

      if (!data) {
        throw new NotFoundException('category not found');
      }

      return { status: 'removed' };
    } catch (err) {
      throw new BadRequestException(`err removing category: ${err}`);
    }
  }
}
