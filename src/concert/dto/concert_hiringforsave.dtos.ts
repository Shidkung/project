import {  IsNotEmpty ,IsDate} from "class-validator";
import { UsersS, concert } from "../../../typeors";

export class CreateconcerthiringforsaveDto {
  @IsNotEmpty()
  buyer_id: UsersS

  @IsNotEmpty()
  Concert_id: concert
  

  @IsNotEmpty()
  reciever_id: UsersS

  @IsNotEmpty()  
  TicketNum:number

  @IsNotEmpty()
  Ticketpay:number

  @IsNotEmpty()
  Accepting:boolean

}