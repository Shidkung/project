import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticketforbuyer,concert,TicketpayAll, UsersS } from '../../../typeors';
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
import { Test } from '@nestjs/testing';
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
  async gettICKETConcertById(id: number){
    const get_TIcket = await this.Ticketforbuyer.find({where:{user_id:id}});
    let myArray = new Array(get_TIcket.length);
    let myObject = new Object();
    for(let i = 0; i<get_TIcket.length;i++){
        const concert_id = get_TIcket[i].Concert_id
        const concert = await this.concertRepository.find({where:{id:concert_id}})
        myObject = {
          url : concert[i].PhotoUrl,
          Concert_name : concert[i].name,
          Ticketnum : get_TIcket[i].Ticket
        }
        myArray[i] = myObject
  }
  return myArray
}
  getConcertByname(name: string ){
    return this.concertRepository.findOne({where:{name:name}})
  }
   async gethiring(Create_sccceptingDto:Create_sccceptingDto){
      const print = await  this.TicketpayAllRepository.findOne({where:{id:Create_sccceptingDto.id,buyer_id:Create_sccceptingDto.buyer_id, reciever_id:Number(Create_sccceptingDto.reciever_id)}})
      console.log(print.Concert_id)
      return print
  }

  async getaccept(Create_sccceptingDto:Create_sccceptingDto){
    const concert = await this.getConcertByname(Create_sccceptingDto.Concert_name)
    const not_accept = await this.TicketpayAllRepository.findOne({where:{id:Create_sccceptingDto.id,Accepting:false}});
    const accept : CreateconcerthiringforsaveDto = {
      buyer_id: Number(not_accept.buyer_id),
      Concert_id:Number(concert.id),
      reciever_id:Number(not_accept.reciever_id),
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

  async gethiringAll(buyer_id:number){
    const test = await this.TicketpayAllRepository.find({where:{buyer_id:buyer_id}});
    let myArray = new Array(test.length);
    let myObject = new Object();
      for(let i = 0; i<test.length;i++){
        const reciever = await this.UsersService.findUsersById(test[i].reciever_id);
        const reciever_name = reciever.username;
        const buyer = await this.UsersService.findUsersById(test[i].buyer_id);
        const buyer_name = buyer.username;
        const concert = await this.getConcertById(test[i].Concert_id)
        const concert_name = concert.name
        myObject={
          id:test[i].id,
          reciever_id : reciever.user_id,
            reciever_username : reciever_name,
            reciever_name : reciever.name,
            buyer_id : buyer.user_id,
            buyer_username : buyer_name,
            buyer_name : buyer.name,
            concert_id : concert.id,
            concert_name : concert_name,
            Ticketpay : test[i].Ticketpay,
            TicketNum : test[i].TicketNum,
            Accepting : test[i].Accepting

        }
        myArray[i] = myObject
        
      }
    return myArray
}
async getrecievingAll(reciever_id:number){
  const test = await this.TicketpayAllRepository.find({where:{reciever_id:reciever_id}});
  let myArray = new Array(test.length);
  let myObject = new Object();
    for(let i = 0; i<test.length;i++){
      const reciever = await this.UsersService.findUsersById(test[i].reciever_id);
      const reciever_name = reciever.username;
      const buyer = await this.UsersService.findUsersById(test[i].buyer_id);
      const buyer_name = buyer.username;
      const concert = await this.getConcertById(test[i].Concert_id)
      const concert_name = concert.name
      myObject={
        id:test[i].id,
        reciever_id : reciever.user_id,
          reciever_username : reciever_name,
          reciever_name : reciever.name,
          buyer_id : buyer.user_id,
          buyer_username : buyer_name,
          buyer_name : buyer.name,
          concert_id : concert.id,
          concert_name : concert_name,
          Ticketpay : test[i].Ticketpay,
          TicketNum : test[i].TicketNum,
          Accepting : test[i].Accepting

      }
      myArray[i] = myObject
      
    }
  return myArray
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
                        user_id: Number(CreateconcertbuyDto.user_id),
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
                            Concert_id : Number(concert.id),
                            Ticket:Number(CreateconcertbuyDto.Ticket),
                            user_id:change.user_id  
                          }
                         const add = this.Ticketforbuyer.create(addTicket);
                          this.Ticketforbuyer.save(add)
                         this.Ticketpayservice.Topdown(change)
                          this.concertRepository.update(concert.id,change_amount)
                      return "Successful";
                 }
                  else
                  {
                    return "Ticket not enough"
                  }

               }

            }
        }
      }
   }
  async buybyhiring(CreateconcerthiringDto:CreateconcerthiringDto){
    const hiringvalue = 300;
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
                if(check.Ticketpay<=((CreateconcerthiringDto.TicketNum * concert.price)+hiringvalue)){
                    return "Ticketpay not enough"
                }
                else{
                  const change: CreateTicketpayDto = {
                    user_id: CreateconcerthiringDto.reciever_id,
                    Ticketpay: concert.price*Number(CreateconcerthiringDto.TicketNum)+hiringvalue
                  }

                  const addforhiring:CreateconcerthiringforsaveDto = {
                      buyer_id : Number(buyer.user_id),
                      Concert_id:Number(concert.id),
                      reciever_id:Number(reciever.user_id),
                      TicketNum:CreateconcerthiringDto.TicketNum,
                      Ticketpay:Number(CreateconcerthiringDto.TicketNum * concert.price)+hiringvalue,
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
    const hiringvalue = 300;
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
              const checks = await this.gethiring(Create_sccceptingDto); 
               if(concert.TicketNum<=0){
                const change: CreateTicketpayDto = {
                  user_id: checks.reciever_id,
                  Ticketpay: concert.price*Number(checks.TicketNum)
                }
                return this.Ticketpayservice.Topdown(change),this.TicketpayAllRepository.delete(checks.id),"Ticket was sold out"
               }
               else{
                
                if(checks == null){
                  const change: CreateTicketpayDto = {
                    user_id: checks.reciever_id,
                    Ticketpay: concert.price*Number(checks.TicketNum)
                  }
                  return this.Ticketpayservice.Topdown(change),this.TicketpayAllRepository.delete(checks.id),"Dont have this hiring"
                }
                
                  if(checks.Ticketpay-hiringvalue>=(concert.price * checks.TicketNum)){
                    if(checks.Accepting==true){
                      const hiring_money: CreateTicketpayDto = {
                        user_id: checks.reciever_id,
                        Ticketpay: hiringvalue
                      }
                    
                      const change_amount :CreateconcertDto={
                            name:concert.name,
                            PhotoUrl:concert.PhotoUrl,
                            TicketNum: concert.TicketNum-Number(checks.TicketNum),
                            price:concert.price,
                            Start:concert.Start,
                            End:concert.End                      
                          }
                          const addTicket : CreateTicketforbuyDto={
                            Concert_id : concert.id,
                            Ticket:checks.TicketNum,
                            user_id: Create_sccceptingDto.reciever_id
                          }
                          const add = this.Ticketforbuyer.create(addTicket);
                          console.log(add)
                         return this.Ticketpayservice.Topup(hiring_money),this.TicketpayAllRepository.delete(checks.id),this.Ticketforbuyer.save(add),this.concertRepository.update(concert.id,change_amount),"success"
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
