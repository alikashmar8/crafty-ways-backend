import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Product } from 'src/products/product.entity';
// import { ProductsService } from 'src/products/products.service';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, 
    // Product
  ])],
  providers: [CategoriesService,
    //  ProductsService
    ],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
