import { Injectable } from '@nestjs/common';
import { CreateconcerthiringDto } from './concert/dto/concert_hiring.dtos';

@Injectable()
export class AppService {
 async getDatatofront(CreateconcerthiringDto:CreateconcerthiringDto) {
    return  CreateconcerthiringDto;
  }
}
