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
import { Create_sccceptingDto } from '../dto/concert_accepting.dtos';
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
   async gethiring(Create_sccceptingDto:Create_sccceptingDto){
      const print = await  this.TicketpayAllRepository.findOne({where:{id:Create_sccceptingDto.id,buyer_id:Create_sccceptingDto.buyer_id, reciever_id:Create_sccceptingDto.reciever_id}})
      return print
  }

  async getaccept(Create_sccceptingDto:Create_sccceptingDto){
    const concert = await this.getConcertByname(Create_sccceptingDto.Concert_name)
    const not_accept = await this.TicketpayAllRepository.findOne({where:{id:Create_sccceptingDto.id,Accepting:false}});
    const accept : CreateconcerthiringforsaveDto = {
      buyer_id:  not_accept.buyer_id,
      Concert_id:concert,
      reciever_id: not_accept.reciever_id,
      TicketNum: not_accept.TicketNum,
      Ticketpay:Number( not_accept.TicketNum)*Number(concert.price),
      Accepting: true
    }
    const check =  await this.gethiring(Create_sccceptingDto); 
    return this.TicketpayAllRepository.update(check.id,accept);
  }
  
  async getinject(Create_sccceptingDto:Create_sccceptingDto){
    const check =  await this.gethiring(Create_sccceptingDto);
    console.log(check);
    if(check==null){
      return "Dont have this hiring"
    }
    const concert = await this.getConcertByname(Create_sccceptingDto.Concert_name)
    const change: CreateTicketpayDto = {
      user_id: Create_sccceptingDto.reciever_id,
      Ticketpay: Number(concert.price)*Number(check.TicketNum)
    }
    return this.Ticketpayservice.Topup(change),this.TicketpayAllRepository.delete(Create_sccceptingDto.id);
  }

  async gethiringAll(CreateconcerthiringDto:CreateconcerthiringDto){
    const buyer_id = CreateconcerthiringDto.buyer_id
    return await this.TicketpayAllRepository.findBy({buyer_id})
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
                        Ticketpay: Number(concert.price)*Number(CreateconcertbuyDto.Ticket)
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
  async buybyhiring(CreateconcerthiringDto:CreateconcerthiringDto){
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
      if(buyer===null){
        return "Dont have this account"
      }
      else{
          const concert = await this.concertRepository.findOne({where:{name:CreateconcerthiringDto.Concert_name}})
          if(concert === null){
      
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
                    return "Ticketpay not enough"
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
                      Ticketpay:Number(CreateconcerthiringDto.TicketNum * concert.price),
                      Accepting : false
                  }
        
                 
                  const add = this.TicketpayAllRepository.create(addforhiring)
                  return this.Ticketpayservice.Topdown(change),this.TicketpayAllRepository.save(add),"success"
                }
              }
            }
          }
      }
    }

  }
  async buyforhiring(Create_sccceptingDto:Create_sccceptingDto){
    const user_id = Create_sccceptingDto.reciever_id;
    const user_idd = Number(user_id)
      const search = await this.UsersService.findUsersById(user_idd);
      if(search === null){
        return "Dont have this user"
      }
      else{
        const check= await this.Ticketpayservice.check(Create_sccceptingDto.reciever_id);
        if(check===null){
          return "Please add the Ticket"
        }
        else{
            const concert = await this.getConcertByname(Create_sccceptingDto.Concert_name);
            if(concert===null){
                return "Dont have this concert"
            }
            else{
               if(concert.TicketNum<=0){
                return "Ticket was sold out"
               }
               else{
                const checks = await this.gethiring(Create_sccceptingDto); 
                if(checks == null){
                  return "Dont have this hiring"
                }
                
                  if(checks.Ticketpay>=(concert.price * checks.TicketNum)){
                    if(checks.Accepting==true){
             
                      const change_amount :CreateconcertDto={
                            name:concert.name,
                            PhotoUrl:concert.PhotoUrl,
                            TicketNum: concert.TicketNum-Number(checks.TicketNum),
                            price:concert.price,
                            Start:concert.Start,
                            End:concert.End                      
                          }
                          const addTicket : CreateTicketforbuyDto={
                            Concert_id : concert,
                            Ticket:checks.TicketNum,
                            user_id: Create_sccceptingDto.reciever_id
                          }
                          const add = this.Ticketforbuyer.create(addTicket);
                          console.log(add)
                         return this.TicketpayAllRepository.delete(checks.id),this.Ticketforbuyer.save(add),this.concertRepository.update(concert.id,change_amount),"success"
                        }
                  else{
                    return "Ticketpay not enough"
                  }
                }
                }
               }

            }
        }
      }

  }
