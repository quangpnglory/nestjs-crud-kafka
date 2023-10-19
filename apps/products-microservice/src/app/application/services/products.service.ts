import { Injectable } from '@nestjs/common';
import { CreateProductDto, ProductDto } from '@nestjs-microservices/shared/dto';
import {
  Observable,
  catchError,
  concatMap,
  from,
  map,
  of,
  switchMap,
} from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  getData(): { message: string } {
    return { message: 'Welcome to products-microservice!' };
  }

  createProduct(
    createProduct: CreateProductDto
  ): Observable<{ message: string }> {
    return from(this.prisma.product.create({ data: createProduct })).pipe(
      map(() => ({ message: 'tạo sản phẩm thành công' })),
      catchError((error) =>
        of({ message: 'Có lỗi khi tạo sản phẩm: ' + error.message })
      )
    );
  }

  async getProducts(): Promise<ProductDto[]> {
    const products = await this.prisma.product.findMany();

    const productDtos: ProductDto[] = products.map((product) => ({
      name: product.name,
      price: product.price,
      description: product.description,
    }));
                                                                
    return productDtos;
  }

  async getOne(id: number) {
    let idProduct = 0;
    idProduct = typeof id === 'number' ? id : parseInt(id);
    return of(
      await this.prisma.product.findUnique({
        where: { id: idProduct },
      })
    ).pipe(
      map((product) => {
        if (!product) {
          return { message: 'Product not found' };
        }

        return { name: product.name, price: product.price };
      })
    );
  }

  async getOneByName(name: string) {
    if(name === null || name === undefined || name === '') { return {message: 'Name not provided'};}
    return of(
      await this.prisma.product.findFirst({
        where: { name: name },
      })
    ).pipe(
      map((product) => {
        if (!product) {
          return { error: 'Product not found' };
        }

        return { name: product.name, price: product.price };
      })
    );
  }

  async updateProduct(key: string, updateProduct: ProductDto) {
    return of(key).pipe(
      switchMap((name) => {
        return this.prisma.product.findFirst({
          where: {
            name: name,
          },
        });
      }),
      concatMap((product) => {
        if (!product) {
          return of({ message: 'Product not found' });
        } else {
          return from(
            this.prisma.product.update({
              where: {
                id: product.id,
              },
              data: {
                name: updateProduct.name,
                price: updateProduct.price,
                description: updateProduct.description,
              },
            })
          ).pipe(map(() => ({ message: 'Update product success' })),
            catchError((error) => {
              return of({
                message: 'Update product error:'+ error.message,
              });
            }));
        }
      })
    );
  }
}
