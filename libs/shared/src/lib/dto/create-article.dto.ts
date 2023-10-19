import { IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  description?: string;

  body: string;

  published?: boolean = false;
}
