import { AppConfig } from './app-config';
import { KafkaConfigInterface } from './kafka/kafka.interface';

export interface Config {
  appConfig: AppConfig;
  kafka: KafkaConfigInterface;
}
