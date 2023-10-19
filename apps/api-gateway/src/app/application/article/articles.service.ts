// import { CreateArticleDto } from '@nestjs-microservices/shared/dto';
// import { Inject, Injectable } from '@nestjs/common';
// import { ClientKafka } from '@nestjs/microservices';

// @Injectable()
// export class ArticlesService {
//   constructor(
//     @Inject('ARTICLE_MICROSERVICE') private readonly articleClient: ClientKafka
//   ) {}

//   createArticle(createArticleDto: CreateArticleDto) {
//     return this.articleClient.emit('create-article', createArticleDto);
//   }
// }
