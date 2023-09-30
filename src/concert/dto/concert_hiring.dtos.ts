import {  IsNotEmpty ,IsDate} from "class-validator";
import { UsersS } from "../../../typeors";

export class CreateconcerthiringDto {
  @IsNotEmpty()
  buyer_id: number

  @IsNotEmpty()
  Concert_name: string
  

  @IsNotEmpty()
  reciever_id: number

  @IsNotEmpty()  
  TicketNum:number

}