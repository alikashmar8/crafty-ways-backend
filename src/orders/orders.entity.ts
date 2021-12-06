import { Product } from 'src/products/product.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne, PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  customer_id: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ default: 0 })
  total_amount: number;

  @Column({ default: 0 })
  origin_amount: number;

  @Column({ default: 0 })
  paid_amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany((type) => Product, (product) => product.orders)
  @JoinTable()
  products: Product[];

  @ManyToOne((type) => User, (user) => user.orders)
  @JoinColumn({ name: 'customer_id' })
  customer: User;
}
