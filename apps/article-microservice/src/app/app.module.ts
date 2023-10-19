import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from './config/config.module';
import { ArticleService } from './config/article-service/article-service';

@Module({
  imports: [ConfigModule, PrismaModule, ArticleService.registerService()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
