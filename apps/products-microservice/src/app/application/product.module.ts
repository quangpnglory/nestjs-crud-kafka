import { Module } from '@nestjs/common';

import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/products.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
