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

  @Column({
    nullable: false,
    name:'Concert_id',
    default: 0,
  })
  Concert_id:number;

  @Column({
    nullable: false,
    name:'user_id',
    default: 0,
  }) // Specify the custom name here
  user_id: number;

}