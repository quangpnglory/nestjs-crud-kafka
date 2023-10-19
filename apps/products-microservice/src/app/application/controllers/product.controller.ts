import { Controller, Get } from '@nestjs/common';

import { Ctx, KafkaContext, MessagePattern } from '@nestjs/microservices';
import { CreateProductDto, ProductDto } from '@nestjs-microservices/shared/dto';
import { ProductService } from '../services/products.service';

@Controller()
export class ProductController {
  constructor(private readonly appService: ProductService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('create-product')
  async createProduct(@Ctx() context: KafkaContext) {
    const { value } = context.getMessage();
    const productDto = value as unknown as CreateProductDto;

    return await this.appService.createProduct(productDto);
  }

  @MessagePattern('get-products')
  async getProducts() {
    return await this.appService.getProducts();
  }

  @MessagePattern('get-one')
  async getOne(@Ctx() context: KafkaContext) {
    const { value } = context.getMessage();
    const id = value as unknown as number;

    return await this.appService.getOne(id);
  }

  @MessagePattern('get-one-by-name')
  async getOneByName(@Ctx() context: KafkaContext) {
    const { value } = context.getMessage();
    return await this.appService.getOneByName(value as unknown as string);
  }

  @MessagePattern('update-product')
  async updateProduct(@Ctx() context: KafkaContext) {
    const { key, value } = context.getMessage();
    const name = key.toString();
    const updateProduct = value as unknown as ProductDto;

    return await this.appService.updateProduct(name, updateProduct);
  }
}
