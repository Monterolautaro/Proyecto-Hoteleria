import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ })
    name: string;

    @Column({ })
    LastName: string;

    @Column({ })
    email: string;

    @Column({ })
    password: string;

    @Column({ })
    Points: number;

    @Column({ })
    isAdmin: boolean;
}