import { AppConfig } from './app-config/app.config.interface';
import { ArticleServiceConfig } from './article-service/article-service.interface';
import { KafkaConfigInterface } from './kafka/kafka.interface';

export interface Config {
  appConfig: AppConfig;
  kafka: KafkaConfigInterface;
  articleService: ArticleServiceConfig;
}
