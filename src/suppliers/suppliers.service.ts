import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { Supplier } from './types/supplier.types';
import { AuthService } from 'src/auth/auth.service';
import { JwtPayload } from 'src/auth/auth.guard';

@Injectable()
export class SuppliersService {
  constructor(
    private supabaseService: SupabaseService,
    private authService: AuthService,
  ) {}

  async create(createSupplierDto: CreateSupplierDto, token: string) {
    try {
      const payload = (await this.authService.validate(token)) as JwtPayload;

      const supabase = this.supabaseService.getClient();

      const newSupplier = {
        ...createSupplierDto,
        company_id: payload.company.id,
      };

      const { data, error } = await supabase
        .from('suppliers')
        .insert(newSupplier)
        .select()
        .single();

      if (error) {
        throw new BadRequestException(
          `err inserting in supabase: ${error.message}`,
        );
      }

      if (!data) {
        throw new BadRequestException('supplier could not be saved');
      }

      return data as Supplier;
    } catch (err) {
      throw new BadRequestException(`err saving supplier: ${err}`);
    }
  }

  async findAll(token: string) {
    try {
      const payload = (await this.authService.validate(token)) as JwtPayload;

      const supabase = this.supabaseService.getClient();

      const { data, error } = await supabase
        .from('suppliers')
        .select()
        .eq('company_id', payload.company.id);

      if (error) {
        throw new BadRequestException(
          `err getting all suppliers in supabase: ${error.message}`,
        );
      }

      if (!data) {
        throw new BadRequestException('supplier could not be saved');
      }

      return data as Supplier[];
    } catch (err) {
      throw new BadRequestException(`err finding suppliers: ${err}`);
    }
  }

  async findOne(id: number, token: string) {
    try {
      const payload = (await this.authService.validate(token)) as JwtPayload;

      const supabase = this.supabaseService.getClient();

      const { data, error } = await supabase
        .from('suppliers')
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
        throw new BadRequestException('supplier not found');
      }
      return data as Supplier;
    } catch (err) {
      throw new BadRequestException(`err finding supplier: ${err}`);
    }
  }

  async update(
    id: number,
    updateSupplierDto: UpdateSupplierDto,
    token: string,
  ) {
    try {
      const payload = (await this.authService.validate(token)) as JwtPayload;

      const supabase = this.supabaseService.getClient();

      const { data, error } = await supabase
        .from('suppliers')
        .update(updateSupplierDto)
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
        throw new BadRequestException('supplier not found');
      }
      return data as Supplier;
    } catch (err) {
      throw new BadRequestException(`err updating the supplier: ${err}`);
    }
  }

  async remove(id: number, token: string) {
    try {
      const payload = (await this.authService.validate(token)) as JwtPayload;

      const supabase = this.supabaseService.getClient();

      const { data, error } = await supabase
        .from('suppliers')
        .delete()
        .eq('company_id', payload.company.id)
        .eq('id', id);

      if (error) {
        throw new BadRequestException(
          `err removing one in supabase: ${error.message}`,
        );
      }

      if (!data) {
        throw new NotFoundException('supplier not found');
      }

      return { status: 'removed' };
    } catch (err) {
      throw new BadRequestException(`err removing supplier: ${err}`);
    }
  }
}
