import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  description: string;
}
