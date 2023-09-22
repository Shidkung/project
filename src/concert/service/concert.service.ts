import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticketforbuyer,concert,TicketpayAll } from '../../../typeors';
import { Repository } from 'typeorm';
import { CreateconcertDto } from '../dto/concert.dtos';
import { CreateconcertbuyDto } from '../dto/concert_buy.dtos';
import { UsersService } from 'src/user/service/user.service';
import { TicketpayService } from 'src/Ticketpay/service/Ticketpay.service';
import { CreateTicketpayDto } from 'src/Ticketpay/dto/Ticketpay.dtos';
import { CreateconcerthiringDto } from '../dto/concert_hiring.dtos';
import { CreateTicketforbuyDto } from '../dto/Ticketbuy.dtos';
import { CreateconcerthiringforsaveDto } from '../dto/concert_hiringforsave.dtos';
@Injectable()
export class ConcertService {
    constructor(
        @InjectRepository(concert) private readonly concertRepository: Repository<concert>,
        @InjectRepository(TicketpayAll) private readonly TicketpayAllRepository: Repository<TicketpayAll>, 
        @InjectRepository(Ticketforbuyer) private readonly Ticketforbuyer: Repository<Ticketforbuyer>,
         private UsersService : UsersService,private Ticketpayservice : TicketpayService
      ) {}

  getAllConcerts(){
    return this.concertRepository.find();
  }

  getConcertById(id: number){
    return this.concertRepository.findOne({where:{id:id}})
  }

  getConcertByname(name: string ){
    return this.concertRepository.findOne({where:{name:name}})
  }

  addConcert(CreateconcertDto:CreateconcertDto){
    const addConcert = this.concertRepository.create(CreateconcertDto)
    return this.concertRepository.save(addConcert);
  }

  async BuyConcert(CreateconcertbuyDto:CreateconcertbuyDto){
    const user_id = CreateconcertbuyDto.user_id;
    const user_idd = Number(user_id)
      const search = this.UsersService.findUsersById(user_idd);
      if(search === null){
        return "Dont have this user"
      }
      else{
        const check= await this.Ticketpayservice.check(CreateconcertbuyDto.user_id);
        if(check===null){
          return "Please add the Ticket"
        }
        else{
            const concert = await this.getConcertByname(CreateconcertbuyDto.Concert_name);
            if(concert===null){
                return "Dont have this concert"
            }
            else{
               if(concert.TicketNum<=0){
                return "Ticket was sold out"
               }
               else{
                  if(check.Ticketpay>=(concert.price * Number(CreateconcertbuyDto.Ticket))){
                      const change: CreateTicketpayDto = {
                        user_id: CreateconcertbuyDto.user_id,
                        Ticketpay: concert.price*Number(CreateconcertbuyDto)
                      }
                
                      const change_amount :CreateconcertDto={
                            name:concert.name,
                            PhotoUrl:concert.PhotoUrl,
                            TicketNum: concert.TicketNum-Number(CreateconcertbuyDto.Ticket),
                            price:concert.price,
                            Start:concert.Start,
                            End:concert.End                      
                          }
                          const addTicket : CreateTicketforbuyDto={
                            Concert_id : concert,
                            Ticket:Number(CreateconcertbuyDto.Ticket),
                            user_id:change.user_id  
                          }
                          const add = this.Ticketforbuyer.create(addTicket);
                      return this.Ticketpayservice.Topdown(change),this.concertRepository.update(concert.id,change_amount),this.Ticketforbuyer.save(add),"Successful";
                  }
                  else{
                    return "Ticket not enough"
                  }

               }

            }
        }
      }
  }
  async buyforhiring(CreateconcerthiringDto:CreateconcerthiringDto){
    const user_id = CreateconcerthiringDto.reciever_id;
    const user_idd = Number(user_id)
    const reciever = await this.UsersService.findUsersById(user_idd);
    if(reciever === null){
      return "Dont have this user"
    }
    else{
      const buyer_id = CreateconcerthiringDto.buyer_id;
      const buyer_idd = Number(buyer_id)
      const buyer = await this.UsersService.getUserhiring(buyer_idd);
      console.log(buyer)
      if(buyer===null){
        console.log(buyer);
        return "Dont have this account"
      }
      else{
          const concert = await this.concertRepository.findOne({where:{name:CreateconcerthiringDto.Concert_name}})
          console.log(concert);
          if(concert === null){
            console.log(concert);
            return "Dont have this concert"
          }
          else{
            if(concert.TicketNum<=0){
              return "Ticket was sold out"
            }
            else{
              const check= await this.Ticketpayservice.check(CreateconcerthiringDto.reciever_id);
              if(check===null){
                return "Please add the Ticket"
              }
              else{
                if(check.Ticketpay<=(CreateconcerthiringDto.TicketNum * concert.price)){
                    return "Ticket not enough"
                }
                else{
                  const change: CreateTicketpayDto = {
                    user_id: CreateconcerthiringDto.reciever_id,
                    Ticketpay: concert.price*Number(CreateconcerthiringDto.TicketNum)
                  }

                  const addforhiring:CreateconcerthiringforsaveDto = {
                      buyer_id : buyer,
                      Concert_id:concert,
                      reciever_id:reciever,
                      TicketNum:CreateconcerthiringDto.TicketNum,
                      Ticketpay:Number(CreateconcerthiringDto.TicketNum * concert.price)
                  }
        
                  const change_amount :CreateconcertDto={
                    name:concert.name,
                    PhotoUrl:concert.PhotoUrl,
                    TicketNum: concert.TicketNum-Number(CreateconcerthiringDto.TicketNum),
                    price:concert.price,
                    Start:concert.Start,
                    End:concert.End                      
                  }
                  const add = this.TicketpayAllRepository.create(addforhiring)
                  return this.Ticketpayservice.Topdown(change),this.TicketpayAllRepository.save(add),this.concertRepository.update(concert.id,change_amount),"success"
                }
              }
            }
          }
      }
    }

  }
}