import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { StoreCategoryDTO } from './dtos/store-category.dto';

@Injectable()
export class CategoriesService { constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    // private productsService: ProductsService
  ) {}
  async findAll() {
    return await this.categoriesRepository.find();
  }

  async store(data: StoreCategoryDTO) {
    return await this.categoriesRepository.save(data);
  }

  async findById(id: string): Promise<Category> {
    return await this.categoriesRepository
      .findOneOrFail(id, { relations: ['products'] })
      .catch((err) => {
        throw new BadRequestException('Category not found');
      });
  }

  async update(id: string, data: StoreCategoryDTO) {
    await this.categoriesRepository.update(id, data);
    return await this.findById(id);
  }

  // async delete(id: string) {
  //   const category = await this.findById(id);
  //   let products = category.products;
  //   await products.forEach(async product => await this.productsService.delete(product.id))
  //   return await this.categoriesRepository.delete(id);
  // }
}

