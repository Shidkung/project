import { Column, Entity, PrimaryGeneratedColumn ,CreateDateColumn,ManyToOne,JoinColumn} from 'typeorm';
import { UsersS } from './user.entity';

@Entity()
export class Ticketpay {
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
    name:'user_id',
    default: 0,
  }) // Specify the custom name here
  user_id: number;

}