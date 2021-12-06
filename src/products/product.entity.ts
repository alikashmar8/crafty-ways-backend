import { Category } from 'src/categories/category.entity';
import { Image } from 'src/images/image.entity';
import { Order } from 'src/orders/orders.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ default: 0 })
  total_reviews: number;

  @Column({ default: 0 })
  rating: number;

  @Column({ default: true })
  is_public: boolean;

  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne((type) => Category, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany((type) => Image, (image) => image.product, { onDelete: 'CASCADE' })
  images: Image[];

  @ManyToMany((type) => Order, (order) => order.products, {
    onDelete: 'CASCADE',
  })
  orders: Order[];
}
