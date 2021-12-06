import {
  Body,
  Controller, Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { CategoriesService } from './categories.service';
import { StoreCategoryDTO } from './dtos/store-category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async getAll() {
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.categoriesService.findById(id);
  }

  @Put(':id')
  @UseGuards(new AdminGuard())
  @UsePipes(new ValidationPipe())
  async update(@Body() data: StoreCategoryDTO, @Param('id') id: string) {
    return await this.categoriesService.update(id, data);
  }

  // @Delete(':id')
  // @UseGuards(new AdminGuard())
  // async delete(@Param('id') id: string) {
  //   return await this.categoriesService.delete(id);
  // }

  @Post()
  @UseGuards(new AdminGuard())
  @UsePipes(new ValidationPipe())
  async store(@Body() data: StoreCategoryDTO) {
    return await this.categoriesService.store(data);
  }
}
