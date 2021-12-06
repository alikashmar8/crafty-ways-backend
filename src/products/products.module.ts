import { Image } from 'src/images/image.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesService } from 'src/images/images.service';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { Product } from './product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Image]),
     NestjsFormDataModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ImagesService],
})
export class ProductsModule {}
