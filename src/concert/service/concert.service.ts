import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { concert } from '../../../typeors';
import { Repository } from 'typeorm';
import { CreateconcertDto } from '../dto/concert.dtos';
@Injectable()
export class ConcertService {
    constructor(
        @InjectRepository(concert) private readonly concertRepository: Repository<concert>
      ) {}
//   private concerts: Concert[] = [
//     // new Concert(1, 'Concert 1', 'https://example.com/concert1.jpg'),
//     // new Concert(2, 'Concert 2', 'https://example.com/concert2.jpg'),
//     // Add more concerts as needed
    
//     // GET /concerts: Get a list of all concerts.
//     // GET /concerts/:id: Get a specific concert by its ID.
//   ];
  getAllConcerts(){
    return this.concertRepository.find();
  }

  getConcertById(id: number){
    return this.concertRepository.findOne({where:{id:id}})
  }
  addConcert(CreateconcertDto:CreateconcertDto){
    const addConcert = this.concertRepository.create(CreateconcertDto)
    return this.concertRepository.save(addConcert);
  }
}