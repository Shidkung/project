import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { concert} from '../../typeors';
import { ConcertController } from './controller/concert.controller';
import { ConcertService } from './service/concert.service';
import { UsersModule } from 'src/user/user.module';
import { TicketpayModule } from 'src/Ticketpay/Ticketpay.module';

@Module({
  imports:[TypeOrmModule.forFeature([concert]),UsersModule,TicketpayModule],
  controllers: [ConcertController],
  providers: [ConcertService]
})
export class ConcertModule {}