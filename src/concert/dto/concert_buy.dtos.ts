import { IsDate, IsNotEmpty } from "class-validator";

export class CreateconcertbuyDto {
  @IsNotEmpty()
  user_id: number

  @IsNotEmpty()
  name: string

}