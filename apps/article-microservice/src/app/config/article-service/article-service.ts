import { KafkaConfigInterface } from '../kafka/kafka.interface';
import { Config } from '../config';
import { DynamicModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

export class ArticleService {
  static serviceName = 'ARTICLE_SERVICE';
  static kafkaConfig: KafkaConfigInterface = {
    client: {
      clientId: 'article',
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'bff',
    },
  };
  static config = new Config();

  static registerService(): DynamicModule {
    try {
      const {
        kafka,
        articleService: { name },
      } = this.config.readConfig();
      this.serviceName = name;
      this.kafkaConfig = kafka;
      // eslint-disable-next-line no-empty
    } catch (error) {}

    const {
      client: { clientId, brokers },
      consumer: { groupId },
    } = this.kafkaConfig;

    return ClientsModule.register([
      {
        name: this.serviceName,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId,
            brokers,
          },
          consumer: {
            groupId,
          },
        },
      },
    ]);
  }
}
