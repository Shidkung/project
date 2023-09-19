import { Column, Entity, PrimaryGeneratedColumn ,CreateDateColumn} from 'typeorm';
@Entity()
export class loginS {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  user_id: number;

  @CreateDateColumn({
    name:'time'
  })
  created_at: Date;

  @Column({
    name: 'username',
    nullable: false,
    default: '',
  })
  username: string;

}