import {  IsNotEmpty ,IsDate} from "class-validator";
import { UsersS } from "../../../typeors";
import { concert } from "../../../typeors";

export class CreateTicketforbuyDto {
  @IsNotEmpty()
  user_id: UsersS

  @IsNotEmpty()
  Ticket: number

  @IsNotEmpty()
  Concert_id: concert

}