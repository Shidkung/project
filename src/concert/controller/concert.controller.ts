import { Body, Controller, Get,Post,ParseIntPipe,Res,HttpStatus } from '@nestjs/common';
import { ConcertService } from '../service/concert.service';
import { NotFoundException } from '@nestjs/common';
import { CreateconcertDto } from '../dto/concert.dtos';
import { CreateconcertbuyDto } from '../dto/concert_buy.dtos';
import { CreateconcerthiringDto } from '../dto/concert_hiring.dtos';
import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Response } from 'express';
import { Create_sccceptingDto } from '../dto/concert_accepting.dtos';
@Controller('concerts')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Get()
  getAllConcerts() {
    return this.concertService.getAllConcerts();
  }
  @Get('hiring')
  getAllhiring(@Body()Create_sccceptingDto:Create_sccceptingDto) {
    return this.concertService.gethiring(Create_sccceptingDto);
  }

   @Get('id')
  getConcertById(@Body('id', ParseIntPipe) id: number) {
    const concert = this.concertService.getConcertById(id);
    if (!concert) {
      throw new NotFoundException('Concert not found');
    }
    return concert;
  }

  @Get('accept')
  @UsePipes(ValidationPipe)
  getaccept(@Body()CreateconcerthiringDto:Create_sccceptingDto){
      return this.concertService.getaccept(CreateconcerthiringDto)
  }
  @Get('inject')
  @UsePipes(ValidationPipe)
  getinject(@Body()Create_sccceptingDto:Create_sccceptingDto){
      return this.concertService.getinject(Create_sccceptingDto)
  }
  @Get('hiring')
  @UsePipes(ValidationPipe)
  gethiring(@Body()Create_sccceptingDto:Create_sccceptingDto) {
    return this.concertService.gethiring(Create_sccceptingDto);
  }
  @Post('create')
  Addconcert(@Body() CreateconcertDto :CreateconcertDto){
    return this.concertService.addConcert(CreateconcertDto);
  }
  @Post('buy')
  @UsePipes(ValidationPipe)
 async buyconcert(@Body()CreateconcertbuyDto: CreateconcertbuyDto,@Res() response: Response){

    const check = await this.concertService.BuyConcert(CreateconcertbuyDto);
    switch (check) {
      case "Dont have this user":
        response.status(HttpStatus.CONFLICT).send('Dont have this user');
        break;
    
      case "Please add the Ticket":
        response.status(HttpStatus.CONFLICT).send('Please add the Ticket');
        break;
      
      case "Dont have this concert":
        response.status(HttpStatus.CONFLICT).send('Dont have this concert');
        break;

      case "Ticket was sold out":
        response.status(HttpStatus.CONFLICT).send('Ticket was sold out');
        break;
      case"Ticket not enough":
        response.status(HttpStatus.CONFLICT).send('Ticket not enough');
        break;
      default:
        return CreateconcertbuyDto
        break;
    }
  }
  @Post('employ')
  @UsePipes(ValidationPipe)
  async employer(@Body() CreateconcerthiringDto:CreateconcerthiringDto,@Res() response: Response){
    const check = await this.concertService.buyforhiring(CreateconcerthiringDto);
    switch (check) {
      case "Dont have this user":
        response.status(HttpStatus.CONFLICT).send('Dont have this user');
        break;
      
      case"Dont have this account":
      response.status(HttpStatus.CONFLICT).send('Dont have this account');
      break;
      case "Please add the Ticket":
        response.status(HttpStatus.CONFLICT).send('Please add the Ticket');
        break;
      
      case "Dont have this concert":
        response.status(HttpStatus.CONFLICT).send('Dont have this concert');
        break;

      case "Ticket was sold out":
        response.status(HttpStatus.CONFLICT).send('Ticket was sold out');
        break;
      case"Ticket not enough":
        response.status(HttpStatus.CONFLICT).send('Ticket not enough');
        break;
      default:
        response.status(HttpStatus.OK).send('success');
        break;
        
    }
  }
}