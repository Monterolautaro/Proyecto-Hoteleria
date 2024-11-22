import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { state } from './state.entity';

@Entity()
export class Transaction {

    @PrimaryGeneratedColumn('uuid')
    transaction_id: string = uuid()
   
    @Column()
    method: string

    @OneToOne (() => state, (state) => state.transaction)
    @JoinColumn({ name: 'state_id' })
    state: state
}