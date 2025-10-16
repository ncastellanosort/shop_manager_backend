import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Company {
  @CreateDateColumn({ type: 'timestamp' })
  insertedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taxId: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  contact: string;

  @Column()
  email: string;

  @Column()
  hashedPassword: string;

  @Column({ default: true })
  isActive: boolean;
}
