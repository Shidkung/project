import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUsersDto {
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
  
  @IsNotEmpty()
  name: string
  @IsNotEmpty()
  role: string;
}