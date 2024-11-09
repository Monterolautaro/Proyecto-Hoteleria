import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid'
import { Credentials } from './credentials.entity';

@Entity({
    name: 'users'
})
export class User {

    @PrimaryGeneratedColumn('uuid')
    user_id: string = uuid();

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    birthday: Date;

    @Column({
        default: false
    })
    isAdmin: boolean

    @OneToOne(() => Credentials, credential => credential.user)
    @JoinColumn({ name: 'credential_id' })
    credential!: Credentials

}