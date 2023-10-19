import { Controller } from '@nestjs/common';
import { Ctx, KafkaContext, MessagePattern } from '@nestjs/microservices';
import { ResponseMessage } from './response-message.type';
import { ResponseService } from '../../../response.service';

@Controller('message')
export class MessageController {
  constructor(private readonly responseService: ResponseService) {}

  @MessagePattern('create-article')
  createArticle(@Ctx() context: KafkaContext): void {
    const { key, value } = context.getMessage();
    const rid = 'article';
    const subject = this.responseService.get(rid);

    switch (key.toString()) {
      case 'create_response':
        console.log('create-article_response' + value);

        if ((<ResponseMessage>(<unknown>value)).error) {
          console.log(new Error((<ResponseMessage>(<unknown>value)).error));
          subject.error(new Error((<ResponseMessage>(<unknown>value)).error));
        }

        console.log('massage controller  ' + <ResponseMessage>(<unknown>value));
        subject.next(<ResponseMessage>(<unknown>value));

        return subject.complete();
    }
  }
}
