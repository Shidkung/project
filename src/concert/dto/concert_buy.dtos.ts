import {  IsNotEmpty } from "class-validator";
import { UsersS } from "../../../typeors";


export class CreateconcertbuyDto {
  @IsNotEmpty()
  user_id: UsersS

  @IsNotEmpty()
  Ticket: Number

  @IsNotEmpty()
  Concert_name: string

 
}