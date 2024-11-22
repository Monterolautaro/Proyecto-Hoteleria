import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './users/user.entity';

@Entity({
  name: 'credentials',
})
export class Credentials {
  @PrimaryGeneratedColumn('uuid')
  credential_id: string = uuid();

  @Column({
    unique: true,
    nullable: false,
    type: 'varchar',
  })
  username: string;

  @Column({
    unique: true,
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @Column({
    unique: false,
    nullable: false,
    type: 'varchar',
  })
  password: string;

  @OneToOne(() => User, (user) => user.credential, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
