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

}