import {Body,Controller,Get,HttpCode,Param,ParseIntPipe,Post,UsePipes,ValidationPipe,HttpStatus,Res} from '@nestjs/common';
import { Response } from 'express';
import { CreateTicketpayDto } from '../dto/Ticketpay.dtos';
import { TicketpayService } from '../service/Ticketpay.service';

    @Controller('Ticketpay')
    export class TicketpaysController {
      constructor(private readonly TicketpayService: TicketpayService ) {}
      
      
      @Post('add')
      @UsePipes(ValidationPipe)
        async Topup(@Body() CreateTicketpayDto: CreateTicketpayDto,@Res() response: Response) {
        const created = await this.TicketpayService.Topup(CreateTicketpayDto);
        if(created =="User doesn't have an account"){
          response.status(HttpStatus.CONFLICT).send("User doesn't have an account");
        }
        else if(created=="Ticketpay is negative"){
          response.status(HttpStatus.CONFLICT).send('Ticketpay is negative');
        }
        else{
          response.status(HttpStatus.CREATED).send('Your Ticket have added');
        }
      }
      @Post('minus')
      @UsePipes(ValidationPipe)
        async Topdown(@Body() CreateTicketpayDto: CreateTicketpayDto,@Res() response: Response) {
        const created = await this.TicketpayService.Topdown(CreateTicketpayDto);
        if(created =="User doesn't have an account"){
          response.status(HttpStatus.CONFLICT).send("User doesn't have an account");
        }
        else if(created=="Ticketpay is negative"){
          response.status(HttpStatus.CONFLICT).send('Ticketpay is negative');
        }
        else{
          response.status(HttpStatus.CREATED).send('Your Ticket have withdraw');
        }
      }
      
      
    }