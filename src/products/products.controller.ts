import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { createWriteStream } from 'fs';
import { FormDataRequest } from 'nestjs-form-data';
import { ImagesService } from 'src/images/images.service';
import { StoreProductDTO } from './dtos/product-store.dto';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private imagesService: ImagesService,
  ) {}

  @Get()
  async getAll(@Query('count') count?: number) {
    return await this.productsService.findAll(count);
  }

  @Get('getLatestProducts')
  async getLatestProducts() {
    return await this.productsService.findLatestProducts();
  }

  @Get('search')
  @ApiQuery({
    name: 'search',
    description: 'search query param',
    required: true,
  })
  async search(@Query('search') search: string): Promise<Product[]> {
    return await this.productsService.searchProducts(search);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.productsService.findById(id, ['category', 'images']);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @FormDataRequest()
  async update(@Body() data: StoreProductDTO, @Param('id') id: string) {
    let product = await this.productsService.update(id, data);
    if (data.images) {
      await this.productsService.deleteImages(id);
      let images = data.images;
      for (let i = 0; i < images.length; i++) {
        let image = images[i];
        if (!['image/jpeg', 'image/png', 'image/jpg'].includes(image.mimetype))
          continue;
        // throw new BadRequestException('File must be an image file');

        let filename = image.originalName.replace(/\s/g, '');
        filename = Date.now() + '-' + filename;

        const ws = createWriteStream('uploads/' + filename);
        ws.write(image.buffer);
        await this.imagesService.store(product.id, 'uploads/' + filename);
      }
    }
    return product;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.productsService.delete(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @FormDataRequest()
  async store(@Body() data: StoreProductDTO) {
    let product = await this.productsService.store(data);

    let images = data.images;

    for (let i = 0; i < images.length; i++) {
      let image = images[i];

      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(image.mimetype))
        continue;
      // throw new BadRequestException('File must be an image file');

      let filename = image.originalName.replace(/\s/g, '');
      filename = Date.now() + '-' + filename;

      const ws = createWriteStream('uploads/' + filename);
      ws.write(image.buffer);
      const img = await this.imagesService.store(product.id, filename);
    }
    return product;
  }
}
