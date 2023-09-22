import { Controller, Get ,Body} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateconcerthiringDto } from './concert/dto/concert_hiring.dtos';

@Controller("noti")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("back")
  getDatatofont(@Body()CreateconcerthiringDto:CreateconcerthiringDto){
    return this.appService. getDatatofront(CreateconcerthiringDto);
  }
}
