import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { concert } from '../../../typeors';
import { Repository } from 'typeorm';
import { CreateconcertDto } from '../dto/concert.dtos';
import { CreateconcertbuyDto } from '../dto/concert_buy.dtos';
import { UsersService } from 'src/user/service/user.service';
import { TicketpayService } from 'src/Ticketpay/service/Ticketpay.service';
@Injectable()
export class ConcertService {
    constructor(
        @InjectRepository(concert) private readonly concertRepository: Repository<concert>, private UsersService : UsersService,private Ticketpayservice : TicketpayService
      ) {}

  getAllConcerts(){
    return this.concertRepository.find();
  }

  getConcertById(id: number){
    return this.concertRepository.findOne({where:{id:id}})
  }
  addConcert(CreateconcertDto:CreateconcertDto){
    const addConcert = this.concertRepository.create(CreateconcertDto)
    return this.concertRepository.save(addConcert);
  }
  BuyConcert(CreateconcertbuyDto){
    const user_id = CreateconcertbuyDto.user_id;
      const search = this.UsersService.findUsersById(user_id);
      if(search === null){
        return "Dont have this user"
      }
      else{
        const check = this.Ticketpayservice
      }
  }
}