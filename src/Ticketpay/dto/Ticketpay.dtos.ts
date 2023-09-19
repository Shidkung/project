import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { UsersS } from "typeors";

export class CreateTicketpayDto {

  @IsNotEmpty()
  user_id: UsersS;

  @IsNotEmpty()
  Ticketpay: number;

  
}