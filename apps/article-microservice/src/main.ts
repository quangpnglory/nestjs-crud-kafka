/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from './app/config/config.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const {
    appConfig,
    kafka: {
      kafkaConfig: {
        client: { clientId, brokers },
        consumer: { groupId },
      },
    },
  } = app.get(ConfigService);
  const { port } = appConfig;

  app.enableCors();
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: { clientId, brokers },
      consumer: {
        groupId,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(port);
  console.log('Ready on', port);
}

bootstrap();
