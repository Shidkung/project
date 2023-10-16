import { Module } from '@nestjs/common';
import { TicketpaysController } from './controller/Ticketpay.controller';
import { TicketpayService } from './service/Ticketpay.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticketpay } from '../../typeors';
import { UsersModule } from '../../src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([Ticketpay]),UsersModule],
  controllers: [TicketpaysController],
  providers: [TicketpayService],
  exports:[TicketpayService]
})
export class TicketpayModule {}
