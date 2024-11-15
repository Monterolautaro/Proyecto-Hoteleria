import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  payment_id: string = uuid();

  @Column()
  amount: number;

  @Column()
  date: Date;

  @Column()
  method: string;

  @OneToOne(() => User, (user) => user.payment)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
