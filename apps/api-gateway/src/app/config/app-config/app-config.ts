import { AppConfig as AppConfigInterface } from './app-config.interface';
import { Config } from '../config';

export class AppConfig {
  port = 3333;
  saltRounds = 10;
  private config = new Config();

  constructor() {
    let config: AppConfigInterface;

    try {
      config = this.config.readConfig().appConfig;
      // eslint-disable-next-line no-empty
    } catch {}

    this.port = config?.port ?? this.port;
    this.saltRounds = config?.saltRounds ?? this.saltRounds;
  }
}
