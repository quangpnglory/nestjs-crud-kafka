import { KafkaConfig } from 'kafkajs';

export interface KafkaConfigInterface {
  client: KafkaConfig;
  consumer: {
    groupId: string;
  };
}
