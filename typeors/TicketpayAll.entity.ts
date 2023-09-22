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

  @ManyToOne(() => UsersS, (users) => users.user_id)
  @JoinColumn({ name: 'buyer_id' }) // Specify the custom name here
  buyer_id: UsersS;

  @ManyToOne(() => UsersS, (users) => users.user_id)
  @JoinColumn({ name: 'reciever_id' }) // Specify the custom name here
  reciever_id: UsersS;

  @ManyToOne(() => concert, (concert) => concert.id)
  @JoinColumn({ name: 'concert_id' }) // Specify the custom name here
  Concert_id: concert;

  
}