import {  IsNotEmpty ,IsDate} from "class-validator";
import { UsersS } from "../../../typeors";

export class CreateconcerthiringDto {
  @IsNotEmpty()
  buyer_id: UsersS

  @IsNotEmpty()
  Concert_name: string
  

  @IsNotEmpty()
  reciever_id: UsersS

  @IsNotEmpty()  
  TicketNum:number

}