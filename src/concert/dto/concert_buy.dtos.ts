import {  IsNotEmpty } from "class-validator";
import { UsersS } from "../../../typeors";


export class CreateconcertbuyDto {
  @IsNotEmpty()
  user_id: number

  @IsNotEmpty()
  Ticket: Number

  @IsNotEmpty()
  Concert_name: string

 
}