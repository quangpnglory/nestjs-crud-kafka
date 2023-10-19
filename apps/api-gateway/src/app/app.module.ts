import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './application/auth/auth.module';
import { ArticleModule } from './application/article/articles.module';
import { PaymentModule } from './application/payment/payments.module';
import { ProductsModule } from './application/products/products.module';

@Module({
  imports: [
    AuthModule,
    ArticleModule,
    PaymentModule,
    ConfigModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
