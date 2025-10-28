import { Company } from 'src/companies/entities/company.entity';
import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  insertedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column()
  name: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  description: string;

  @Column({ unique: true })
  sku: string;

  @Column({ nullable: true })
  barcode: string;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  costPrice: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  discountPercent: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  taxRate: number;

  @Column({ default: 0 })
  stock: number;

  @Column({ default: 0 })
  minStock: number;

  @Column({ default: 0 })
  maxStock: number;

  @Column({ nullable: true })
  warehouseLocation: string;

  @Column({ default: true })
  isTracked: boolean;

  @Column({ nullable: true })
  category_id: number;

  @Column({ nullable: true })
  provider_id: number;

  @Column('simple-array', { nullable: true })
  images: string[];

  @Column({ nullable: true })
  mainImage: string;

  @Column({
    type: 'enum',
    enum: ['available', 'hidden', 'not available'],
    default: 'available',
  })
  state: 'available' | 'hidden' | 'not available';

  @Column('jsonb', { nullable: true })
  attributes: Record<string, any>;

  @ManyToOne(() => Company, (company) => company.products, {
    onDelete: 'CASCADE',
  })
  company: Company;

  @Column()
  companyId: number;

  @Column({ default: false })
  deleted: boolean;

  @Column({ nullable: true })
  createdBy: string;

  @Column({ nullable: true })
  updatedBy: string;
}
