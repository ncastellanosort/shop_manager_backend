import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company {
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
