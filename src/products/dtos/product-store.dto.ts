import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import {
  MemoryStoredFile,
  HasMimeType,
  IsFiles,
  MaxFileSize,
} from 'nestjs-form-data';

export class StoreProductDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsOptional()
  rating: number;

  @ApiProperty()
  @IsNotEmpty()
  category_id: string;

  @IsFiles()
  @MaxFileSize(1e6, { each: true })
  @HasMimeType(['image/jpeg', 'image/png', 'image/jpg'], { each: true })
  images?: MemoryStoredFile[];
}
