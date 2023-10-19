import { Config } from '../config';
import { KafkaConfigInterface } from './kafka.interface';

export class Kafka {
  kafkaConfig: KafkaConfigInterface = {
    client: { clientId: 'article', brokers: ['localhost:9092'] },
    consumer: {
      groupId: 'article-consumer',
    },
  };
  private config = new Config();

  constructor() {
    try {
      this.kafkaConfig = this.config.readConfig().kafka;
      // eslint-disable-next-line no-empty
    } catch {}
  }
}
