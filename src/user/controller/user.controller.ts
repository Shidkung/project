import {Body,Controller,Get,HttpCode,Param,ParseIntPipe,Post,UsePipes,ValidationPipe,HttpStatus,Res} from '@nestjs/common';
import { Response } from 'express';
import { CreateUsersDto } from '../dto/user.dto';
import { UsersService } from '../service/user.service';

    @Controller('users')
    export class UsersController {
      constructor(private readonly userService: UsersService) {}
      
      @Get()
      getUsers() {
        return this.userService.getUsers();
      }
      
      @Get('id/:id')
      findUsersById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findUsersById(id);
      }
      
      @Post('create')
      @UsePipes(ValidationPipe)
        async createUsers(@Body() createUserDto: CreateUsersDto,@Res() response: Response) {
        const created = await this.userService.register(createUserDto);
        if(created =="Have this account"){
          response.status(HttpStatus.CONFLICT).send('Have an account');
        }
        else{
          response.status(HttpStatus.CREATED).send('create user Success');
        }
      }
      
    }