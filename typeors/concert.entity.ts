import { Column, Entity, PrimaryGeneratedColumn ,CreateDateColumn} from 'typeorm';
@Entity()
export class concert {
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
    name: 'name',
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    name: 'PhotoUrl',
    nullable: false,
    default: '',
  })
  PhotoUrl: string;

  @Column({
    name: 'price',
    nullable: false,
    default: 0,
  })
  price: number;
  @Column({
    name: 'TicketNum',
    nullable: false,
    default: 0,
  })
  TicketNum: number;
  @Column({
    type: 'date',
    name: 'Strat',
    nullable: false,
  })
  Start: Date;
  @Column({
    type: 'date',
    name: 'End',
    nullable: false,
  })
  End: Date;


}