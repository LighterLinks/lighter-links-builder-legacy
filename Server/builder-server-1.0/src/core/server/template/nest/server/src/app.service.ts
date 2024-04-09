import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStarted(): string {
    return 'Welcome to Lighter Links builder!';
  }
}
