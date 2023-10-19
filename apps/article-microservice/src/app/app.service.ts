import { CreateArticleDto } from '@nestjs-microservices/shared/dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  getData(): { message: string } {
    return { message: 'Welcome to article-microservice!' };
  }

  async createArticle(
    createArticleDto: CreateArticleDto
  ): Promise<{ message: string }> {
    await this.prisma.article.create({
      data: createArticleDto,
    });
    return { message: 'successful' };
  }
}
