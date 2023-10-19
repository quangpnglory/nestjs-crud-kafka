import { ProductDto } from './product.dto';

export class OrderDto {
  products: ProductDto[] = [];
  totalPrice: number;
}
