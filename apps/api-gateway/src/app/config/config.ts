import { readFileSync } from 'fs';
import { join } from 'path';
import { Config as ConfigInterface } from './config.interface';

export class Config {
  readConfig(): ConfigInterface {
    return JSON.parse(
      readFileSync(join(__dirname, '../../assets/app.config.json'), 'utf-8')
    );
  }
}
