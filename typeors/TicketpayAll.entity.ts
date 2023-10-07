import { Column, Entity, PrimaryGeneratedColumn ,CreateDateColumn,ManyToOne,JoinColumn} from 'typeorm';
import { UsersS } from './user.entity';
import { concert } from './concert.entity';

@Entity()
export class TicketpayAll {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @CreateDateColumn({
    name:'time'
  })
  created_at: Date;


  @Column({
    nullable: false,
    name:'Ticketpay',
    default: 0,
  })
  Ticketpay:number;

  
  @Column({
    nullable: false,
    name:'TicketNum',
    default: 0,
  })
  TicketNum:number;

  @Column({
    nullable: false,
    name:' buyer_id',
    default: 0,
  }) // Specify the custom name here
  buyer_id: number;

  @Column({
    nullable: false,
    name:'reciever_id',
    default:0,
  }) 
 // Specify the custom name here
  reciever_id: number;

  @Column({
    nullable: false,
    name:'Concert_id',
    default: 0,
  }) 
  Concert_id: number;

  @Column({
    nullable: false,
    name:'Accepting',
    default: false,
  })
  Accepting:boolean;
  
  @Column({
    nullable: false,
    name:'Complete',
    default: false,
  })
  Complete:boolean;
}