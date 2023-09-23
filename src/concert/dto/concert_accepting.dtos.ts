import {  IsNotEmpty ,IsDate} from "class-validator";
import { UsersS } from "../../../typeors";

export class Create_sccceptingDto {
    
  @IsNotEmpty()
  id: number
  @IsNotEmpty()
  buyer_id: UsersS

  @IsNotEmpty()
  Concert_name: string
  

  @IsNotEmpty()
  reciever_id: UsersS

}