import { Body, Controller, Get, Param,Post } from '@nestjs/common';
import { ConcertService } from '../service/concert.service';
import { NotFoundException } from '@nestjs/common';
import { CreateconcertDto } from '../dto/concert.dtos';

@Controller('concerts')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Get()
  getAllConcerts() {
    return this.concertService.getAllConcerts();
  }

  @Get('id')
  getConcertById(@Body() id: number) {
    const concert = this.concertService.getConcertById(id);
    if (!concert) {
      throw new NotFoundException('Concert not found');
    }
    return concert;
  }
  @Post('create')
  Addconcert(@Body() CreateconcertDto :CreateconcertDto){
    return this.concertService.addConcert(CreateconcertDto);
  }
}