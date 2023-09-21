import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateconcertDto {
  @IsNotEmpty()
  name: string
  @IsNotEmpty()
  PhotoUrl: string


}