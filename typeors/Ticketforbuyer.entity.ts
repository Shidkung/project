import { Column, Entity, PrimaryGeneratedColumn ,CreateDateColumn,ManyToOne,JoinColumn} from 'typeorm';
import { UsersS } from './user.entity';
import { concert } from './concert.entity';

@Entity()
export class Ticketforbuyer {
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
    name:'Ticket',
    default: 0,
  })
  Ticket:number;


  @ManyToOne(() => concert, (Concert) => Concert.id)
  @JoinColumn({ name: 'concert_id' }) // Specify the custom concert here
  Concert_id: concert;

  @Column({
    nullable: false,
    name:'user_id',
    default: 0,
  }) // Specify the custom name here
  user_id: number;

}