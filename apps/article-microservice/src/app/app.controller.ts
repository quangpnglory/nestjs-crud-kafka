import { CreateArticleDto } from '@nestjs-microservices/shared/dto';
import { Controller, Inject } from '@nestjs/common';

import { AppService } from './app.service';
import {
  ClientKafka,
  Ctx,
  KafkaContext,
  MessagePattern,
} from '@nestjs/microservices';
import { ArticleService } from './config/article-service/article-service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(ArticleService.serviceName)
    private readonly articleClient: ClientKafka
  ) {}

  @MessagePattern('test')
  test() {
    console.log('Testing');
    return 'test';
  }

  // @EventPattern('create-article')
  // createArticle(data: CreateArticleDto) {
  //   return this.appService.createArticle(data);
  // }

  @MessagePattern('create-article')
  async createArticle(@Ctx() context: KafkaContext) {
    const { key, value } = context.getMessage();
    console.log(key.toString());
    switch (key.toString()) {
      case 'create':
        // eslint-disable-next-line no-case-declarations
        const createArticle = value as unknown as CreateArticleDto;
        // eslint-disable-next-line no-case-declarations
        const message = {
          key: 'create',
          value: null,
        };
        console.log('line 42: \n' + createArticle);
        try {
          message.value = await this.appService.createArticle(createArticle);
        } catch (error) {
          message.value = { error: error.massage };
        }
        console.log('line 48: \n' + createArticle);
        // return this.articleClient.emit('create-article', message);
        return message;
    }
  }
}
