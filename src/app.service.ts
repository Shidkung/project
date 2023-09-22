import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDatatoback(): string {
    return 'Hello World!';
  }
}
