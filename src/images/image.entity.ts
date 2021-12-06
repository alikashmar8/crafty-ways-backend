import { Product } from 'src/products/product.entity';
import {
    Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  url: string;

  @Column()
  product_id: string;

  @ManyToOne((type) => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
