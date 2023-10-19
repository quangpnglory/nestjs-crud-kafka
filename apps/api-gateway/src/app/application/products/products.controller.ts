import { CreateProductDto } from '@nestjs-microservices/shared/dto';
import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('products')
export class ProductsController implements OnModuleInit {
  constructor(
    @Inject('PRODUCT_MICROSERVICE')
    private readonly productClient: ClientKafka
  ) {}
  onModuleInit() {
    this.productClient.subscribeToResponseOf('create-product');
    this.productClient.subscribeToResponseOf('get-products');
    this.productClient.subscribeToResponseOf('get-one');
    this.productClient.subscribeToResponseOf('get-one-by-name');
    this.productClient.subscribeToResponseOf('update-product');
  }

  @Post('create')
  create(@Body(ValidationPipe) createProductDto: CreateProductDto) {
    return this.productClient.send('create-product', {
      key: 'create',
      value: createProductDto,
    });
  }

  @Get('allProducts')
  getAllProducts() {
    return this.productClient.send('get-products', {});
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.productClient.send('get-one', { value: id });
  }

  @Get()
  getByName(@Query('name') name: string) {
    return this.productClient.send('get-one-by-name', { value: name });
  }

  @Patch()
  update(
    @Query('name') name: string,
    @Body(ValidationPipe) createProductDto: CreateProductDto
  ) {
    return this.productClient.send('update-product', {
      key: name,
      value: createProductDto,
    });
  }
}
