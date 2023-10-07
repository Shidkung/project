import {  IsNotEmpty ,IsDate} from "class-validator";

export class Create_completeDto {
    
  @IsNotEmpty()
  id: number
  @IsNotEmpty()
  buyer_id: number

  @IsNotEmpty()
  Concert_name: string

  @IsNotEmpty()
  reciever_id: number
  
}
