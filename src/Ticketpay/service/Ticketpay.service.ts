import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticketpay, UsersS } from '../../../typeors';
import { Like, Repository } from 'typeorm';
import { CreateTicketpayDto } from '../dto/Ticketpay.dtos';
import { UsersService } from 'src/user/service/user.service';


@Injectable()
export class TicketpayService {
  constructor(
    @InjectRepository(Ticketpay) private readonly TicketRepository: Repository<Ticketpay>,private usersService: UsersService
  ) {}
     
  async Topup(CreateTicketpayDto: CreateTicketpayDto) {
    const string_user = Number(CreateTicketpayDto.user_id);
    const user = await this.usersService.findUsersById(string_user);
    console.log(user)
    if (user === null) {
        return "User doesn't have an account";
    } else {
      console.log("---------------------------------------------------");
      if(CreateTicketpayDto.Ticketpay>0){
        const usser = CreateTicketpayDto.user_id;
        const foundUser = await this.TicketRepository.findOne({where:{user_id:usser}});
        // Handle the found user here
        if (foundUser === null) {
            const adduser = this.TicketRepository.create(CreateTicketpayDto);
            return this.TicketRepository.save(adduser);
            // User found, handle accordingly 
        } else {
          CreateTicketpayDto.Ticketpay += foundUser.Ticketpay;
            return  this.TicketRepository.update(foundUser.id,CreateTicketpayDto);
           
            // User not found, handle accordingly
        }
      }
      else{
        return "Ticketpay is negative"
      }
    }
}

async check(user_id:number){
      return this.TicketRepository.findOne({where:{user_id:user_id}})
}

async Topdown(CreateTicketpayDto: CreateTicketpayDto){
  const string_user = Number(CreateTicketpayDto.user_id);
  const user = await this.usersService.findUsersById(string_user);
  console.log(user)
  if (user === null) {
      return "User doesn't have an account";
  } else {
    console.log("---------------------------------------------------");
    if(CreateTicketpayDto.Ticketpay>0){
      const usser = CreateTicketpayDto.user_id;
      const foundUser = await this.TicketRepository.findOne({where:{user_id:usser}});
      // Handle the found user here
      if (foundUser === null) {
          return "Please add Ticketpay"
          // User found, handle accordingly 
      } else {  
         if( CreateTicketpayDto.Ticketpay>=0){
          CreateTicketpayDto.Ticketpay *= 1
        }
        else{
          CreateTicketpayDto.Ticketpay *= -1
        }
       foundUser.Ticketpay -=  CreateTicketpayDto.Ticketpay;
       CreateTicketpayDto.Ticketpay = foundUser.Ticketpay
       if(CreateTicketpayDto.Ticketpay<0)
       {
        return "There is not enough to wuthdraw"
       }
       else
       { 
        return  this.TicketRepository.update(foundUser.id,CreateTicketpayDto);
       }
         
           // User not found, handle accordingly
      }
    }
    else{
      return "Ticketpay is negative"
    }
      
  }

}



//  async register(CreateTicketpayDto: CreateTicketpayDto) {
   
//     const newUser = this.userRepository.create(CreateTicketpayDto);
//     return this.userRepository.save(newUser)
     
//   }

//   findUsersById(id: number) {
//     return this.userRepository.findOne({where:{user_id:id}});
//   }

//   getUsers(){
//     return this.userRepository.find()
//   }

  
}