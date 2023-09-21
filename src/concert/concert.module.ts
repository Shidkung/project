import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { concert} from '../../typeors';
import { ConcertController } from './controller/concert.controller';
import { ConcertService } from './service/concert.service';

@Module({
  imports:[TypeOrmModule.forFeature([concert])],
  controllers: [ConcertController],
  providers: [ConcertService]
})
export class ConcertModule {}