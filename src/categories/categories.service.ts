import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { AuthService } from 'src/auth/auth.service';
import { Company } from 'src/companies/entities/company.entity';
import { JwtPayload } from 'src/auth/auth.guard';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,

    private readonly authService: AuthService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, token: string) {
    try {
      const payload = (await this.authService.validate(token)) as JwtPayload;

      const currentCompany = await this.companyRepository.findOne({
        where: { id: payload.company.id },
      });
      if (!currentCompany) throw new BadRequestException('company not found');

      const category = this.categoryRepository.create({
        ...createCategoryDto,
        companyId: currentCompany.id,
      });

      return await this.categoryRepository.save(category);
    } catch (err) {
      throw new BadRequestException(`error creating category: ${err}`);
    }
  }

  async findAll(token: string) {
    try {
      const payload = (await this.authService.validate(token)) as JwtPayload;

      const currentCompany = await this.companyRepository.findOne({
        where: { id: payload.company.id },
      });
      if (!currentCompany) throw new BadRequestException('company not found');

      return await this.categoryRepository.find({
        where: { companyId: currentCompany.id },
        order: { insertedAt: 'DESC' },
      });
    } catch (err) {
      throw new BadRequestException(`error getting categories: ${err}`);
    }
  }

  async findOne(id: number, token: string) {
    try {
      const payload = (await this.authService.validate(token)) as JwtPayload;

      const currentCompany = await this.companyRepository.findOne({
        where: { id: payload.company.id },
      });
      if (!currentCompany) throw new BadRequestException('company not found');

      const category = await this.categoryRepository.findOne({
        where: { id, companyId: currentCompany.id },
      });

      if (!category) throw new NotFoundException('category not found');

      return category;
    } catch (err) {
      throw new BadRequestException(`error getting category: ${err}`);
    }
  }

  async update(id: number, dto: UpdateCategoryDto, token: string) {
    try {
      const payload = (await this.authService.validate(token)) as JwtPayload;

      const currentCompany = await this.companyRepository.findOne({
        where: { id: payload.company.id },
      });
      if (!currentCompany) throw new BadRequestException('company not found');

      const category = await this.categoryRepository.findOne({
        where: { id, companyId: currentCompany.id },
      });
      if (!category) throw new NotFoundException('category not found');

      const updated = Object.assign(category, dto);
      return await this.categoryRepository.save(updated);
    } catch (err) {
      throw new BadRequestException(`error updating category: ${err}`);
    }
  }

  async remove(id: number, token: string) {
    try {
      const payload = (await this.authService.validate(token)) as JwtPayload;

      const currentCompany = await this.companyRepository.findOne({
        where: { id: payload.company.id },
      });
      if (!currentCompany) throw new BadRequestException('company not found');

      const category = await this.categoryRepository.findOne({
        where: { id, companyId: currentCompany.id },
      });
      if (!category) throw new NotFoundException('category not found');

      await this.categoryRepository.remove(category);

      return { message: 'category deleted successfully' };
    } catch (err) {
      throw new BadRequestException(`error deleting category: ${err}`);
    }
  }
}
