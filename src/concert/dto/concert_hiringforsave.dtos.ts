import {  IsNotEmpty ,IsDate} from "class-validator";
import { UsersS, concert } from "../../../typeors";

export class CreateconcerthiringforsaveDto {
  @IsNotEmpty()
  buyer_id:number

  @IsNotEmpty()
  Concert_id: number
  

  @IsNotEmpty()
  reciever_id: number

  @IsNotEmpty()  
  TicketNum:number

  @IsNotEmpty()
  Ticketpay:number

  @IsNotEmpty()
  Accepting:boolean
  @IsNotEmpty()
  Complete:boolean

}