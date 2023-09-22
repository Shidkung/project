import { IsDate, IsEmail, IsNotEmpty,isNotEmpty } from "class-validator";

export class CreateconcertDto {
  @IsNotEmpty()
  name: string
  @IsNotEmpty()
  PhotoUrl: string
  @IsNotEmpty()
  price: number
  @IsNotEmpty()
  TicketNum: number
  @IsNotEmpty()
  @IsDate()
  Start:Date;
  @IsNotEmpty()
  @IsDate()
  End:Date;

}