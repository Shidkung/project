import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUsers_loginDto {

  @IsEmail()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}