import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image) private imagesRepository: Repository<Image>,
  ) {}

  async store(product_id: string, image_url: string): Promise<Image> {
    return await this.imagesRepository.save({
      product_id: product_id,
      url: image_url,
    });
  }

  async delete(id: string) {
    return await this.imagesRepository.delete(id);
  }
}
