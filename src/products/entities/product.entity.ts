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
  @CreateDateColumn({ type: 'timestamp' })
  insertedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('simple-array')
  tags: string[];

  @Column()
  brand: string;

  @Column()
  provider_id: number;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  sku: string;

  @Column()
  stock: number;
  @Column()
  category_id: number;

  @Column({
    type: 'enum',
    enum: ['available', 'hidden', 'not available'],
    default: 'available',
  })
  state: 'available' | 'hidden' | 'not available';

  @ManyToOne(() => Company, (company) => company.products)
  company: Company;

  @Column()
  companyId: number;
}
