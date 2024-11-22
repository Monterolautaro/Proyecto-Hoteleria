import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity()
export class state {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  aproved: boolean;

  @Column()
  pending: boolean;

  @Column()
  refused: boolean;

  @OneToOne(() => Transaction, (transaction) => transaction.state)
  transaction: Transaction;
}
