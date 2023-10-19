import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ConfigModule } from '../../config/config.module';
import { ArticleService } from '../../config/article-service/order-service';
import { ResponseService } from '../../response.service';

@Module({
  imports: [ConfigModule, ArticleService.registerService()],
  providers: [ArticleService, ResponseService],
  controllers: [ArticlesController],
})
export class ArticleModule {}
