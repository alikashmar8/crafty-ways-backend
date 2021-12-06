import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { ImagesService } from 'src/images/images.service';
import { Repository } from 'typeorm';
import { StoreProductDTO } from './dtos/product-store.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    private imagesService: ImagesService,
  ) {}
  async findAll(count?: number) {
    let products;
    if (count != undefined && count != null && count > 0) {
      products = this.productsRepository.find({
        relations: ['category', 'images'],
        take: count,
      });
    } else {
      products = this.productsRepository.find({
        relations: ['category', 'images'],
      });
    }
    return products;
  }

  async store(data: StoreProductDTO) {
    return await this.productsRepository.save({
      name: data.name,
      description: data.description,
      price: data.price,
      rating: data.rating,
      quantity: data.quantity,
      category_id: data.category_id,
    });
  }

  async findById(id: string, relations?: string[]): Promise<Product> {
    return await this.productsRepository
      .findOneOrFail(id, { relations: relations })
      .catch((err) => {
        throw new BadRequestException('Product not found');
      });
  }

  async update(id: string, data: StoreProductDTO) {
    await this.productsRepository.update(id, {
      category_id: data.category_id,
      description: data.description,
      name: data.name,
      rating: data.rating,
      price: data.price,
    });
    return await this.findById(id);
  }

  async deleteImages(productId: string) {
    let product = await this.findById(productId, ['images']);
    for (let i = 0; i < product.images.length; i++) {
      let image = product.images[i];
      try {
        fs.unlinkSync(`uploads/${image.url}`);
        await this.imagesService.delete(image.id);
        return await this.productsRepository.save(product);
      } catch (err) {
        console.log('Error deleting product images: ' + err);
      }
    }
  }

  async delete(id: string) {
    await this.deleteImages(id);
    return await this.productsRepository.delete(id);
  }

  async findLatestProducts() {
    return await this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .orderBy('product.created_at')
      .take(6)
      .getMany();
  }

  async searchProducts(search: string): Promise<Product[]> {
    return await this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where(`LOWER(category.name) like LOWER(:search)`, {
        search: `%${search}%`,
      })
      .orWhere(`LOWER(category.description) like LOWER(:search)`, {
        search: `%${search}%`,
      })
      .where(`LOWER(product.name) like LOWER(:search)`, {
        search: `%${search}%`,
      })
      .orWhere(`LOWER(product.description) like LOWER(:description)`, {
        description: `%${search}%`,
      })
      .getMany();
  }
}
