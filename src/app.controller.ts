import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("noti")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("back")
  getDatatoback(): string {
    return this.appService. getDatatoback();
  }
}
