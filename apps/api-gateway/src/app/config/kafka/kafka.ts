import { Config } from '../config';
import { KafkaConfigInterface } from './kafka.interface';

export class Kafka {
  kafkaConfig: KafkaConfigInterface = {
    client: { clientId: 'bff', brokers: ['localhost:9092'] },
    consumer: {
      groupId: 'bff-consumer',
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
