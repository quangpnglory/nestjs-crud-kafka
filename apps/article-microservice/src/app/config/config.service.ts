import { Injectable } from '@nestjs/common';
import { AppConfig } from './app-config';
import { Kafka } from './kafka/kafka';

@Injectable()
export class ConfigService {
  appConfig = new AppConfig();
  kafka = new Kafka();
}
