import { IsNotEmpty, IsOptional } from 'class-validator';
import { PaymentTypes } from 'src/common/enums/payment-types.enum';

export class StoreOrderDTO {
  @IsNotEmpty()
  product_id: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  phone_number?: string;

  @IsNotEmpty()
  payment_type: PaymentTypes;

  @IsOptional()
  zip_code?: string;

  @IsOptional()
  notes?: string;
}
