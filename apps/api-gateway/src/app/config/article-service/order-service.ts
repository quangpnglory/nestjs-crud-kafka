import { KafkaConfigInterface } from '../kafka/kafka.interface';
import axios, { AxiosInstance } from 'axios';
import { DynamicModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Config } from '../config';

export class ArticleService {
  url = 'http://localhost:3000';
  static serviceName = 'ARTICLE_SERVICE';
  static kafkaConfig: KafkaConfigInterface = {
    client: {
      clientId: 'article',
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'article-consumer',
    },
  };
  request: AxiosInstance;
  static config = new Config();

  constructor() {
    try {
      const articleService = {
        url: 'http://localhost:3000',
        name: 'ARTICLE_SERVICE',
      };
      this.url = articleService.url;
      this.request = axios.create({
        baseURL: this.url,
      });
      // eslint-disable-next-line no-empty
    } catch {}
  }

  static registerService(): DynamicModule {
    try {
      const { kafka } = this.config.readConfig();
      const name = 'ARTICLE_SERVICE';
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
