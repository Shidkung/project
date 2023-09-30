import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { UsersS } from "typeors";

export class CreateTicketpayDto {

  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  Ticketpay: number;

  
}