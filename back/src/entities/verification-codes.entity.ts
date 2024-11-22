import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'verification_codes' })
export class VerificationCode {
  @PrimaryGeneratedColumn('uuid')
  verification_code_id: string = uuid();

  @Column()
  user_id: string;

  @Column()
  code: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  expires_at: Date;
}
