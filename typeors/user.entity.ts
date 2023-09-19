import { Column, Entity, PrimaryGeneratedColumn ,CreateDateColumn} from 'typeorm';

@Entity()
export class UsersS {
  
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
    nullable: false,
    default: '',
  })
  username: string;

  @Column({
    name: 'name',
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    nullable: false,
    default: '',
  })
  role: string;

}