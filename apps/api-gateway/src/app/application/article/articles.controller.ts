import { CreateArticleDto } from '@nestjs-microservices/shared/dto';
import {
  Body,
  Controller,
  Inject,
  // InternalServerErrorException,
  Post,
  ValidationPipe,
  Get,
  OnModuleInit,
} from '@nestjs/common';
// import { ArticlesService } from './articles.service';
// import { Observable, Subject, catchError, combineLatest, map, of } from 'rxjs';
import { ClientKafka } from '@nestjs/microservices';
import { ResponseService } from '../../response.service';
import { ArticleService } from '../../config/article-service/order-service';

@Controller('articles')
export class ArticlesController implements OnModuleInit {
  constructor(
    @Inject(ArticleService.serviceName)
    private readonly articleClient: ClientKafka,
    private readonly responseService: ResponseService
  ) {}
  onModuleInit() {
    this.articleClient.subscribeToResponseOf('test');
    this.articleClient.subscribeToResponseOf('create-article');
  }

  @Get()
  test() {
    return this.articleClient.send('test', {});
  }

  @Post('create')
  create(@Body(ValidationPipe) createArticleDto: CreateArticleDto) {
    // const sendMessage = (): void => {
    //   this.articleClient.send('create-article', {
    //     key: 'create',
    //     value: createArticleDto,
    //   });
    // };
    // console.log('vao day');
    // const rid = 'article';
    // const subject = new Subject();
    // this.responseService.add(rid, subject);

    // return combineLatest([of(sendMessage()), subject]).pipe(
    //   map(([, res]) => res),
    //   catchError((err) => {
    //     throw new InternalServerErrorException(err.message);
    //   })
    // );
    return this.articleClient.send('create-article', {
      key: 'create',
      value: createArticleDto,
    });
  }
  // return this.articlesService.createArticle(createArticleDto);
}
